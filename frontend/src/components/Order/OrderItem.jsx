import { Link } from 'react-router-dom';

const OrderItem = ({ image, name, price, quantity, product }) => {
    return (
        <Link
            to={`/product/${product}`}
            className="flex gap-4 items-start border-b pb-4 hover:bg-gray-50 p-2 rounded"
        >
            <div className="w-20 h-20 flex-shrink-0">
                <img
                    draggable="false"
                    className="h-full w-full object-contain"
                    src={image}
                    alt={name}
                />
            </div>
            <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm font-medium">
                    {name.length > 60 ? `${name.substring(0, 60)}...` : name}
                </p>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">Price:</span>
                    <span className="font-medium">€{price.toLocaleString()}</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="font-medium text-lg">€{(price * quantity).toLocaleString()}</span>
            </div>
        </Link>
    );
};

export default OrderItem;
