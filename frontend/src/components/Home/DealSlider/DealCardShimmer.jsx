const DealCardShimmer = () => {
    return (
        <div className="flex flex-col items-center gap-2 p-6 animate-pulse">
            {/* Image Shimmer */}
            <div className="w-40 h-48 bg-gray-200 rounded"></div>

            {/* Product Name Shimmer */}
            <div className="w-full space-y-2 mt-3">
                <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-3/5 mx-auto"></div>
            </div>

            {/* Offer Text Shimmer */}
            <div className="h-5 bg-gray-200 rounded w-24 mt-2"></div>

            {/* Tag Shimmer */}
            <div className="h-3 bg-gray-200 rounded w-20 mt-1"></div>
        </div>
    );
};

export default DealCardShimmer;
