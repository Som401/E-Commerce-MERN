import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';

const UpdateProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, isUpdated, error } = useSelector((state) => state.product);
    const { product } = useSelector((state) => state.productDetails);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const productId = params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name || "");
            setDescription(product.description || "");
            setPrice(product.price || 0);
            setCuttedPrice(product.cuttedPrice || 0);
            setCategory(product.category || "");
            setStock(product.stock || 0);
            setBrand(product.brand?.name || "");
            setOldImages(product.images || []);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Product Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch({ type: 'INVALIDATE_CACHE' }); // Clear cache to show updated product
            navigate('/admin/products');
        }
    }, [dispatch, error, isUpdated, productId, product, navigate, enqueueSnackbar]);

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldImages) => [...oldImages, reader.result]);
                    setImages((oldImages) => [...oldImages, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const productData = {
            name,
            description,
            price: Number(price),
            cuttedPrice: Number(cuttedPrice),
            category,
            stock: Number(stock),
            brandname: brand,
        };

        // Only include images if new ones were selected
        if (images.length > 0) {
            productData.images = images;
        }

        dispatch(updateProduct(productId, productData));
    }

    return (
        <>
            <MetaData title="Admin: Update Product" />
            <Dashboard activeTab={2}>
                <form onSubmit={updateProductSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-medium mb-4">Update Product</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField
                            label="Product Name"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Brand"
                            variant="outlined"
                            size="small"
                            required
                            fullWidth
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                        <TextField
                            label="Price (€)"
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            label="Cutted Price (€)"
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            required
                            value={cuttedPrice}
                            onChange={(e) => setCuttedPrice(e.target.value)}
                        />
                        <TextField
                            label="Category"
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((el, i) => (
                                <MenuItem value={el} key={i}>
                                    {el}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Stock"
                            type="number"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            required
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        required
                        variant="outlined"
                        size="small"
                        fullWidth
                        className="my-4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <h3 className="font-medium mt-4 mb-2">Product Images</h3>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded p-2 mb-4">
                        {oldImages && oldImages.map((image, i) => (
                            <img draggable="false" src={image.url} alt="Product" key={i} className="w-32 h-full object-contain" />
                        ))}
                        {imagesPreview.map((image, i) => (
                            <img draggable="false" src={image} alt="Product Preview" key={i} className="w-32 h-full object-contain" />
                        ))}
                    </div>
                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg mb-4 w-48">
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={handleProductImageChange}
                            className="hidden"
                        />
                        Choose New Images
                    </label>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-500 uppercase px-6 py-3 text-white font-medium rounded shadow hover:shadow-lg">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="bg-primary-orange uppercase px-6 py-3 text-white font-medium rounded shadow hover:shadow-lg disabled:bg-gray-400">
                            {loading ? 'Updating...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </Dashboard>
        </>
    );
};

export default UpdateProduct;
