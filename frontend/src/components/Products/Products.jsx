import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import Header from '../Layouts/Header/Header';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { useLocation } from 'react-router-dom';

const Products = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const location = useLocation();

    const [price, setPrice] = useState([0, 6000]);
    // Fix: Properly decode URL parameter for category
    const [category, setCategory] = useState(() => {
        const params = new URLSearchParams(location.search);
        return params.get('category') || '';
    });
    const [ratings, setRatings] = useState(0);
    const [sort, setSort] = useState("");

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

    const { products, loading, error, isCached } = useSelector((state) => state.products);
    const keyword = params.keyword;

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }

    const clearFilters = () => {
        setPrice([0, 6000]);
        setCategory("");
        setRatings(0);
        setSort("");
    }

    const handleMinPriceChange = (e) => {
        const value = Number(e.target.value) || 0;
        setPrice([Math.min(value, price[1]), price[1]]);
    }

    const handleMaxPriceChange = (e) => {
        const value = Number(e.target.value) || 6000;
        setPrice([price[0], Math.max(value, price[0])]);
    }

    useEffect(() => {
        // Fetch all products once if not cached
        if (!products || products.length === 0) {
            dispatch(getSliderProducts());
        }
    }, [dispatch, products]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
    }, [error, enqueueSnackbar, dispatch]);

    // Client-side filtering - FAST!
    const getFilteredProducts = () => {
        if (!products || products.length === 0) return [];

        let filtered = [...products];

        // Filter by keyword
        if (keyword) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                product.description.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        // Filter by category
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        // Filter by price range
        filtered = filtered.filter(product =>
            product.price >= price[0] && product.price <= price[1]
        );

        // Filter by ratings
        if (ratings > 0) {
            filtered = filtered.filter(product => product.ratings >= ratings);
        }

        // Sort products
        if (sort) {
            if (sort === 'name_asc') {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sort === 'name_desc') {
                filtered.sort((a, b) => b.name.localeCompare(a.name));
            } else if (sort === 'price_asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sort === 'price_desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (sort === 'ratings_desc') {
                filtered.sort((a, b) => b.ratings - a.ratings);
            }
        }

        return filtered;
    };

    // Get filtered products
    const filteredProducts = getFilteredProducts();
    const filteredProductsCount = filteredProducts.length;

    // Pagination
    const resultPerPage = 12;
    const indexOfLastProduct = currentPage * resultPerPage;
    const indexOfFirstProduct = indexOfLastProduct - resultPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <>
            <MetaData title="All Products | Flipkart" />

            <Header />
            <main className="w-full mt-20 sm-8">

                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">

                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm shadow">

                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span className="uppercase text-primary-blue text-xs cursor-pointer font-medium" onClick={() => clearFilters()}>clear all</span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                                {/* price slider filter */}
                                <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">PRICE</span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() => 'Price range slider'}
                                        min={0}
                                        max={6000}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                        <input
                                            type="number"
                                            value={price[0]}
                                            onChange={handleMinPriceChange}
                                            min={0}
                                            max={price[1]}
                                            className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-primary-blue"
                                        />
                                        <span className="font-medium text-gray-400">to</span>
                                        <input
                                            type="number"
                                            value={price[1]}
                                            onChange={handleMaxPriceChange}
                                            min={price[0]}
                                            max={6000}
                                            className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50 focus:outline-none focus:border-primary-blue"
                                        />
                                    </div>
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <p className="font-medium text-xs uppercase">Category</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel value={el} control={<Radio size="small" />} label={<span className="text-sm" key={i}>{el}</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* category filter */}

                                {/* ratings filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setRatingsToggle(!ratingsToggle)}>
                                        <p className="font-medium text-xs uppercase">ratings</p>
                                        {ratingsToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                    {ratingsToggle && (
                                        <div className="flex flex-col pb-1">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="ratings-radio-buttons-group"
                                                    onChange={(e) => setRatings(e.target.value)}
                                                    value={ratings}
                                                    name="ratings-radio-buttons"
                                                >
                                                    {[4, 3, 2, 1].map((el, i) => (
                                                        <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="flex items-center text-sm">{el}<StarIcon sx={{ fontSize: "12px", mr: 0.5 }} /> & above</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}

                                </div>
                                {/* ratings filter */}

                            </div>

                        </div>
                        {/* <!-- nav tiles --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1">

                        {/* Sort dropdown */}
                        <div className="flex items-center justify-between bg-white px-4 py-3 border-b">
                            <p className="text-sm text-gray-500">
                                Showing {products?.length} of {filteredProductsCount} products
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Sort By:</span>
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    className="border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary-blue"
                                >
                                    <option value="">Relevance</option>
                                    <option value="name_asc">Name: A to Z</option>
                                    <option value="name_desc">Name: Z to A</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="ratings_desc">Ratings: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                <img draggable="false" className="w-1/2 h-44 object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="Search Not Found" />
                                <h1 className="text-2xl font-medium text-gray-900">Sorry, no results found!</h1>
                                <p className="text-xl text-center text-primary-grey">Please check the spelling or try searching for something else</p>
                            </div>
                        )}

                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                                <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
                                    {currentProducts?.map((product) => (
                                        <Product {...product} key={product._id} />
                                    ))
                                    }
                                </div>
                                {filteredProductsCount > resultPerPage && (
                                    <Pagination
                                        count={Number(((filteredProductsCount + 6) / resultPerPage).toFixed())}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                        color="primary"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    {/* <!-- search column --> */}
                </div >
                {/* <!-- row --> */}

            </main >
        </>
    );
};

export default Products;
