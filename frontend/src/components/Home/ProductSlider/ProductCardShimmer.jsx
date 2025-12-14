const ProductCardShimmer = () => {
    return (
        <div className="flex flex-col items-center gap-2 p-6 cursor-pointer animate-pulse">
            {/* Image Shimmer */}
            <div className="w-36 h-36 bg-gray-200 rounded"></div>

            {/* Title Shimmer */}
            <div className="w-full space-y-2 mt-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>

            {/* Price Shimmer */}
            <div className="flex items-center gap-2 mt-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>

            {/* Rating Shimmer */}
            <div className="h-4 bg-gray-200 rounded w-20 mt-1"></div>
        </div>
    );
};

export default ProductCardShimmer;
