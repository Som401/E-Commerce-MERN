import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product';
import ProductCardShimmer from './ProductCardShimmer';

const ProductSlider = ({ title, tagline, category }) => {

    const { loading, products, isCached } = useSelector((state) => state.products);
    const [showShimmer, setShowShimmer] = useState(true);
    const [randomProducts, setRandomProducts] = useState([]);

    // Simulate e-commerce loading with 1-second shimmer on every refresh
    useEffect(() => {
        setShowShimmer(true);
        const timer = setTimeout(() => {
            setShowShimmer(false);
            // Randomize products after shimmer
            if (products && products.length > 0) {
                setRandomProducts(getRandomProducts(products, 12));
            }
        }, 1000); // 1 second shimmer

        return () => clearTimeout(timer);
    }, [products]); // Re-randomize when products change

    // Create view all link with category if provided
    const viewAllLink = category ? `/products?category=${encodeURIComponent(category)}` : '/products';

    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium">{title}</h1>
                    <p className="text-sm text-gray-400">{tagline}</p>
                </div>
                <Link to={viewAllLink} className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg uppercase">view all</Link>
            </div>
            <hr />

            {showShimmer || loading ? (
                <Slider {...settings} className="flex items-center justify-between p-1">
                    {[...Array(12)].map((_, index) => (
                        <ProductCardShimmer key={index} />
                    ))}
                </Slider>
            ) : (
                <Slider {...settings} className="flex items-center justify-between p-1">
                    {randomProducts.map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </Slider>
            )}

        </section>
    );
};

export default ProductSlider;
