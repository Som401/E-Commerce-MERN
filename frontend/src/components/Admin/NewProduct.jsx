import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { createProduct, clearErrors } from '../../actions/productAction';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import Dashboard from './Dashboard';

const NewProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, success, error } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [cuttedPrice, setCuttedPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const handleProductImageChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

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

    const newProductSubmitHandler = (e) => {
        e.preventDefault();

        if (images.length <= 0) {
            enqueueSnackbar("Add Product Images", { variant: "warning" });
            return;
        }

        const productData = {
            name,
            description,
            price: Number(price),
            cuttedPrice: Number(cuttedPrice),
            category,
            stock: Number(stock),
            brandname: brand,
            images: images  // Array of base64 images
        };

        dispatch(createProduct(productData));
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Product Created Successfully", { variant: "success" });
            dispatch({ type: NEW_PRODUCT_RESET });
            // Refresh product list for admin
            dispatch({ type: 'INVALIDATE_CACHE' }); // Clear frontend cache
            navigate("/admin/products");
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: New Product" />
            <Dashboard activeTab={3}>
                <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-medium mb-4">Add New Product</h2>

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
                        {imagesPreview.map((image, i) => (
                            <img draggable="false" src={image} alt="Product" key={i} className="w-32 h-full object-contain" />
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
                        Choose Images
                    </label>

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-500 uppercase px-6 py-3 text-white font-medium rounded shadow hover:shadow-lg">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="bg-primary-orange uppercase px-6 py-3 text-white font-medium rounded shadow hover:shadow-lg disabled:bg-gray-400">
                            {loading ? 'Creating...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </Dashboard>
        </>
    );
};

export default NewProduct;
