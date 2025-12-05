export const mockProducts = [
    {
        _id: "1",
        name: "Apple iPhone 13 (Blue, 128 GB)",
        description: "iPhone 13. The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. Superfast 5G. And a brighter Super Retina XDR display.",
        highlights: [
            "128 GB ROM",
            "15.49 cm (6.1 inch) Super Retina XDR Display",
            "12MP + 12MP | 12MP Front Camera",
            "A15 Bionic Chip Processor"
        ],
        specifications: [
            { title: "General", description: "In The Box: iPhone, USB-C to Lightning Cable, Documentation | Model Name: iPhone 13 | Color: Blue | Browse Type: Smartphones | SIM Type: Dual Sim | Hybrid Sim Slot: No | Touchscreen: Yes | OTG Compatible: No" },
            { title: "Display Features", description: "Display Size: 15.49 cm (6.1 inch) | Resolution: 2532 x 1170 Pixels | Resolution Type: Super Retina XDR Display | GPU: New 4 Core | Display Type: All Screen OLED Display | Other Display Features: HDR Display, True Tone, Wide Colour (P3), Haptic Touch, Contrast Ratio: 2000000:1 (Typical), 800 nits Max Brightness (Typical), 1200 nits Peak Brightness (HDR), Fingerprint Resistant Oleophobic Coating" }
        ],
        price: 69999,
        cuttedPrice: 79900,
        images: [
            {
                public_id: "products/iphone13",
                url: "https://rukminim1.flixcart.com/image/416/416/ktketu80/mobile/6/n/d/iphone-13-mlpg3hn-a-apple-original-imag6vpyghayhhrh.jpeg"
            }
        ],
        brand: {
            name: "Apple",
            logo: {
                public_id: "brands/apple",
                url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            }
        },
        category: "Mobiles",
        stock: 20,
        warranty: 1,
        ratings: 4.6,
        numOfReviews: 8567,
        reviews: [
            {
                user: "user1",
                name: "Rajesh Kumar",
                rating: 5,
                comment: "Awesome phone! Camera quality is superb."
            },
            {
                user: "user2",
                name: "Priya Singh",
                rating: 4,
                comment: "Good phone but a bit expensive."
            }
        ]
    },
    {
        _id: "2",
        name: "Samsung Galaxy S21 FE 5G (Graphite, 8GB, 128GB Storage)",
        description: "Samsung Galaxy S21 FE 5G is equipped with a powerful camera, so you can shoot stunning photos and videos. Thanks to the 120 Hz refresh rate, you can play games, scroll through content, and enjoy a smooth experience.",
        highlights: [
            "8 GB RAM | 128 GB ROM",
            "16.26 cm (6.4 inch) Full HD+ Display",
            "64MP + 12MP + 8MP | 32MP Front Camera",
            "4500 mAh Battery",
            "Snapdragon 888 Processor"
        ],
        specifications: [
            { title: "General", description: "In The Box: Handset, Data Cable, Sim Ejector Pin, User Manual | Model Name: Galaxy S21 FE 5G | Color: Graphite | Browse Type: Smartphones | SIM Type: Dual Sim | Hybrid Sim Slot: Yes | Touchscreen: Yes | OTG Compatible: Yes" },
            { title: "Display Features", description: "Display Size: 16.26 cm (6.4 inch) | Resolution: 2340 x 1080 Pixels | GPU: Adreno 660 | Display Type: Full HD+ Dynamic AMOLED 2X Display | Other Display Features: 120Hz Refresh Rate" }
        ],
        price: 44999,
        cuttedPrice: 54999,
        images: [
            {
                public_id: "products/samsung-s21",
                url: "https://rukminim1.flixcart.com/image/416/416/ku79vgw0/mobile/p/w/0/galaxy-s21-fe-5g-sm-g990blbhins-samsung-original-imag7bphny8aqnfh.jpeg"
            }
        ],
        brand: {
            name: "Samsung",
            logo: {
                public_id: "brands/samsung",
                url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg"
            }
        },
        category: "Mobiles",
        stock: 15,
        warranty: 1,
        ratings: 4.4,
        numOfReviews: 5234,
        reviews: []
    },
    {
        _id: "3",
        name: "Lenovo IdeaPad Gaming 3 Ryzen 5 Hexa Core AMD R5-5600H",
        description: "With the Lenovo Ideapad Gaming 3 laptop, you can level up your gaming experience as it allows you to enjoy a seamless performance while playing demanding games. This laptop features AMD Ryzen 5 processor and NVIDIA RTX 3050 graphics.",
        highlights: [
            "AMD Ryzen 5 Hexa Core Processor",
            "8 GB DDR4 RAM",
            "512 GB SSD",
            "NVIDIA GeForce RTX 3050 4 GB Graphics",
            "39.62 cm (15.6 Inch) Display"
        ],
        specifications: [
            { title: "General", description: "Sales Package: Laptop, Power Adapter, User Guide | Model Name: IdeaPad Gaming 3 | Series: IdeaPad Gaming 3 | Color: Shadow Black | Type: Gaming Laptop | Suitable For: Gaming | Battery Cell: 4 Cell | MS Office Provided: No" },
            { title: "Processor And Memory Features", description: "Processor Name: AMD Ryzen 5 Hexa Core | Processor Generation: 5th Gen | SSD: Yes | SSD Capacity: 512 GB | RAM: 8 GB | RAM Type: DDR4 | Processor Variant: AMD R5-5600H" }
        ],
        price: 62990,
        cuttedPrice: 85790,
        images: [
            {
                public_id: "products/lenovo-ideapad",
                url: "https://rukminim1.flixcart.com/image/416/416/ktketu80/computer/5/d/m/ideapad-gaming-3-thin-and-light-laptop-lenovo-original-imag6wb7hz6yhjsp.jpeg"
            }
        ],
        brand: {
            name: "Lenovo",
            logo: {
                public_id: "brands/lenovo",
                url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg"
            }
        },
        category: "Laptops",
        stock: 10,
        warranty: 1,
        ratings: 4.5,
        numOfReviews: 3456,
        reviews: []
    },
    {
        _id: "4",
        name: "boAt Airdopes 131 with upto 60 Hours Playback Bluetooth Headset",
        description: "Plug into an immersive auditory experience with boAt Airdopes 131. These true wireless earbuds come equipped with our very own Beast Mode for minimal latency so that your audio and video are always in sync.",
        highlights: [
            "60 Hours Playback",
            "With Mic:Yes",
            "ASAP Charge",
            "ENx Technology",
            "BEAST Mode"
        ],
        specifications: [
            { title: "General", description: "Model Name: Airdopes 131 | Color: Black | Headphone Type: True Wireless | Inline Remote: No | Sales Package: Earbuds, Charging Case, Charging Cable, Warranty Card, User Manual" },
            { title: "Connectivity", description: "Bluetooth Version: 5.0 | Wireless range: 10 m | With Microphone: Yes" }
        ],
        price: 1099,
        cuttedPrice: 4990,
        images: [
            {
                public_id: "products/boat-airdopes",
                url: "https://rukminim1.flixcart.com/image/416/416/l0wrafk0/headphone/a/h/d/-original-imagchpzrvhqvqnz.jpeg"
            }
        ],
        brand: {
            name: "boAt",
            logo: {
                public_id: "brands/boat",
                url: "https://www.boat-lifestyle.com/cdn/shop/files/logo-img.png"
            }
        },
        category: "Electronics",
        stock: 50,
        warranty: 1,
        ratings: 4.2,
        numOfReviews: 18234,
        reviews: []
    },
    {
        _id: "5",
        name: "Canon EOS 1500D DSLR Camera Body + 18-55 mm IS II Lens",
        description: "Create stunning images with the Canon EOS 1500D DSLR Camera. With a built-in Wi-Fi, you can instantly share your photographs on various social media platforms.",
        highlights: [
            "Effective Pixels: 24.1 MP",
            "Sensor Type: CMOS",
            "WiFi Available",
            "Full HD Video Recording",
            "Optical Zoom: 3x"
        ],
        specifications: [
            { title: "General", description: "Model Name: EOS 1500D | Type: DSLR | Color: Black | In The Box: DSLR Camera, 18-55 IS II Lens, Eyecup Ef, Camera Cover R-F-3, Camera Strap, EW-400D, Battery Pack LP-E10, Battery Charger LC-E10" },
            { title: "Image Sensor", description: "Sensor Type: CMOS | Effective Pixels: 24.1 MP | Image Sensor Size: APS-C (22.3 x 14.9 mm)" }
        ],
        price: 29999,
        cuttedPrice: 36995,
        images: [
            {
                public_id: "products/canon-1500d",
                url: "https://rukminim1.flixcart.com/image/416/416/jt4olu80/dslr-camera/j/e/z/eos-eos-1500d-canon-original-imafejrfhed8dbrp.jpeg"
            }
        ],
        brand: {
            name: "Canon",
            logo: {
                public_id: "brands/canon",
                url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Canon_wordmark.svg"
            }
        },
        category: "Camera",
        stock: 8,
        warranty: 1,
        ratings: 4.6,
        numOfReviews: 4523,
        reviews: []
    },
    {
        _id: "6",
        name: "Sony Bravia 139 cm (55 inch) Ultra HD (4K) LED Smart Android TV",
        description: "Enjoy an immersive viewing experience with this Android TV from Sony. Powered by the 4K HDR Processor X1, it offers impressive picture quality.",
        highlights: [
            "Supported Apps: Netflix, Amazon Prime Video, Disney+ Hotstar",
            "Operating System: Android (Google Assistant & Chromecast in-built)",
            "Ultra HD (4K) 3840 x 2160 Pixels",
            "Launch Year: 2021"
        ],
        specifications: [
            { title: "General", description: "Model Name: KD-55X74K | Display Size: 139 cm (55 inch) | Resolution: Ultra HD (4K) 3840 x 2160 Pixels | In the Box: 1 TV Unit, User Manual, Power Cord, Table Top Stand, Voice Search Remote Control" },
            { title: "Smart TV Features", description: "Operating System: Android | Supported Apps: Netflix, Amazon Prime Video, Disney+ Hotstar, Youtube, Sony LIV | Pre-Installed Apps: Google Play Movies & TV, Google Play Music, Google Play Games" }
        ],
        price: 56990,
        cuttedPrice: 92900,
        images: [
            {
                public_id: "products/sony-tv",
                url: "https://rukminim1.flixcart.com/image/416/416/xif0q/television/3/6/w/-original-imagtfbghjyfhmzg.jpeg"
            }
        ],
        brand: {
            name: "Sony",
            logo: {
                public_id: "brands/sony",
                url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg"
            }
        },
        category: "Television",
        stock: 5,
        warranty: 1,
        ratings: 4.5,
        numOfReviews: 2134,
        reviews: []
    }
];
