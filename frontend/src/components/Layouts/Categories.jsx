import gamingPCs from '../../assets/images/Categories/gaming-pcs.jpg';
import gamingAccessories from '../../assets/images/Categories/gaming-accessories.jpg';
import consoles from '../../assets/images/Categories/consoles.jpg';
import phones from '../../assets/images/Categories/phones.jpg';
import tv from '../../assets/images/Categories/tv.jpg';
import laptops from '../../assets/images/Categories/laptops.jpg';
import appliances from '../../assets/images/Categories/applicances.jpg';
import audioAccessories from '../../assets/images/Categories/audio-accessories.jpg';
import { Link } from 'react-router-dom';

const catNav = [
    {
        name: "Gaming PCs",
        icon: gamingPCs,
    },
    {
        name: "Gaming Accessories",
        icon: gamingAccessories,
    },
    {
        name: "Consoles",
        icon: consoles,
    },
    {
        name: "Phones",
        icon: phones,
    },
    {
        name: "TVs",
        icon: tv,
    },
    {
        name: "Laptops",
        icon: laptops,
    },
    {
        name: "Appliances",
        icon: appliances,
    },
    {
        name: "Audio & Accessories",
        icon: audioAccessories,
    },
]

const Categories = () => {
    return (
        <section className="hidden sm:block bg-white mt-10 mb-4 min-w-full px-12 py-1 shadow overflow-hidden">

            <div className="flex items-center justify-between mt-4">

                {catNav.map((item, i) => (
                    <Link to={`/products?category=${item.name}`} className="flex flex-col gap-1 items-center p-2 group" key={i}>
                        <div className="h-16 w-16 rounded-full overflow-hidden">
                            <img draggable="false" className="h-full w-full object-cover rounded-full" src={item.icon} alt={item.name} />
                        </div>
                        <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">{item.name}</span>
                    </Link>
                ))}

            </div>
        </section>
    );
};

export default Categories;
