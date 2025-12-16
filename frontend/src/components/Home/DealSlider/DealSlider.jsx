import Product from './Product';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { getRandomProducts } from '../../../utils/functions';
import DealCardShimmer from './DealCardShimmer';

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 1,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const DealSlider = ({ title }) => {
    const { products } = useSelector((state) => state.products);
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
    }, [products]);

    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-3 justify-between items-center">
                <h1 className="text-xl font-medium">{title}</h1>
                <Link to="/products" className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg">VIEW ALL</Link>
            </div>
            <hr />
            {/* <!-- header --> */}

            {showShimmer || !products || products.length === 0 ? (
                <Slider {...settings}>
                    {[...Array(12)].map((_, index) => (
                        <DealCardShimmer key={index} />
                    ))}
                </Slider>
            ) : (
                <Slider {...settings}>
                    {randomProducts.map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider>
            )}

        </section>
    );
};

export default DealSlider;
