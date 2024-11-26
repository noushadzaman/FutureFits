import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));

        }
        setFilterProducts(productsCopy)
    }

    const sortProduct = () => {
        let fpCopy = filterProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
                break;

            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);


    return (
        <div className="pt-[141px] flex flex-col sm:flex-row gap-1 sm:gap-10 border-t px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            {/* filters */}
            <div className="min-w-60 mt-8">
                <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
                    Filters
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2">
                            <input onChange={toggleCategory} value={'Men'} className="w-3" type="checkbox" />Men
                        </p>
                        <p className="flex gap-2">
                            <input onChange={toggleCategory} value={'Women'} className="w-3" type="checkbox" />Women
                        </p>
                        <p className="flex gap-2">
                            <input onChange={toggleCategory} value={'Kids'} className="w-3" type="checkbox" />Kids
                        </p>
                    </div>
                </div>
                {/* subcategory */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">Type</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {/* <p className="flex gap-2">
                            <input onChange={toggleSubCategory} value={'tshirt'} className="w-3" type="checkbox" />T-shirt
                        </p> */}
                        <p className="flex gap-2">
                            <input onChange={toggleSubCategory} value={'hoodie'} className="w-3" type="checkbox" />Hoodie
                        </p>
                        <p className="flex gap-2">
                            <input onChange={toggleSubCategory} value={'pants'} className="w-3" type="checkbox" />Pants
                        </p>
                        {/* <p className="flex gap-2">
                            <input onChange={toggleSubCategory} value={'joggers'} className="w-3" type="checkbox" />Joggers
                        </p> */}
                        <p className="flex gap-2">
                            <input onChange={toggleSubCategory} value={'shoes'} className="w-3" type="checkbox" />Shoes
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}

            <div className="flex-1">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"ALL COLLECTIONS"} />
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className="border-2 border-gray-300 text-sm px-2"
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to high</option>
                        <option value="high-low">Sort by: High to low</option>
                    </select>
                </div>

                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 gap-y-6 max-w-[1100px] mx-auto">
                    {
                        filterProducts.map((item, index) => <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                        />)
                    }
                </div>

            </div>
        </div>
    );
};

export default Collection;