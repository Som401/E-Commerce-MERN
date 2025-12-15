import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import { Button } from '@mui/material';
import MetaData from '../Layouts/MetaData';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../utils/constants';

const NewProduct = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }

        if (success) {
            enqueueSnackbar("Product Created Successfully", { variant: "success" });
            navigate("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate, enqueueSnackbar]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title="Create Product" />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 ml-64 p-8 flex justify-center items-center">
                    <form
                        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md flex flex-col gap-6"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Create Product</h1>

                        <div className="relative">
                            <SpellcheckIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                            />
                        </div>
                        <div className="relative">
                            <AttachMoneyIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <DescriptionIcon className="absolute left-3 top-3 text-gray-400" />
                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                            ></textarea>
                        </div>

                        <div className="relative">
                            <AccountTreeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <select 
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <StorageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-primary-blue
                                    hover:file:bg-blue-100
                                "
                            />
                        </div>

                        <div className="flex overflow-x-auto gap-2 py-2">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" className="h-16 w-16 object-cover rounded-md border border-gray-200" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                            className="w-full bg-primary-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            sx={{
                                backgroundColor: '#FF6E00',
                                '&:hover': {
                                    backgroundColor: '#e66300',
                                },
                                color: 'white',
                                padding: '0.8rem',
                            }}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewProduct;
