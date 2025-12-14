import { useSelector } from 'react-redux';
import MetaData from '../Layouts/MetaData';
import Header from '../Layouts/Header/Header';
import Product from './Product';
import { Link } from 'react-router-dom';

const Wishlist = () => {

    const { wishlistItems } = useSelector((state) => state.wishlist);

    return (
        <>
            <MetaData title="My Wishlist" />
            <Header />
            <main className="w-full mt-20">

                <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                    <div className="flex-1 shadow bg-white">
                        {/* <!-- wishlist container --> */}
                        <div className="flex flex-col">
                            <span className="font-medium text-lg px-4 sm:px-8 py-4 border-b">My Wishlist ({wishlistItems.length})</span>

                            {wishlistItems.length === 0 && (
                                <div className="flex items-center flex-col gap-2 m-6">
                                    <img draggable="false" className="object-contain w-1/2 h-48" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty Wishlist" />
                                    <span className="text-lg font-medium mt-6">Empty Wishlist</span>
                                    <p>You have no items in your wishlist. Start adding!</p>
                                    <Link to="/products" className="bg-primary-blue text-sm text-white px-12 py-2 rounded-sm shadow mt-3">Shop Now</Link>
                                </div>
                            )}

                            {wishlistItems.map((item, index) => (
                                <Product {...item} key={index} />
                            )
                            ).reverse()}

                        </div>
                        {/* <!-- wishlist container --> */}

                    </div>

                </div>
            </main>
        </>
    );
};

export default Wishlist;
