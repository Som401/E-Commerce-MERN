import { Link } from 'react-router-dom';
import { getDiscount } from '../../../utils/functions';

const Product = ({ _id, images, name, price, cuttedPrice, ratings }) => {
    // Use first image from images array
    const image = images && images.length > 0 ? images[0].url : 'https://via.placeholder.com/150';

    // Calculate discount or show rating
    const discount = cuttedPrice && cuttedPrice > price
        ? `${getDiscount(price, cuttedPrice)}% Off`
        : `${ratings}★ Rated`;

    return (
        <Link to={`/product/${_id}`} className="flex flex-col items-center gap-1.5 p-6 cursor-pointer">
            <div className="w-36 h-36 transform hover:scale-110 transition-transform duration-150 ease-out">
                <img draggable="false" className="w-full h-full object-contain" src={image} alt={name} />
            </div>
            <h2 className="font-medium text-sm mt-2 text-center line-clamp-2">{name}</h2>
            <span className="text-primary-green text-sm font-medium">{discount}</span>
            <span className="text-gray-500 text-sm">€{price.toLocaleString()}</span>
        </Link>
    );
};

export default Product;
