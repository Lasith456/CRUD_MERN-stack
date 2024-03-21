import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import  axios  from "axios";
import Product from '../component/product'
import {VITE_BACKEND_URL} from "../App";
const HomePage = ()=>{
    const [products,setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async() =>{
        try {
            setIsLoading(true);
            const response= await axios.get(`${VITE_BACKEND_URL}/api/product`);
            console.log(response.data);
            setProducts(response.data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getProducts();
    },[ ])
    return (
        <div>
            <div>
                <Link to="/create" className="inline-block px-4 py-2 mt-4 font-bold text-white bg-blue-700 rounded-sm shadow-md hover:bg-blue-600 hover:cursor-pointer">Add New Item</Link>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-5 lg:grid-cols-4">
                {isLoading ? (
                    "Loading..."
                ) : (
                    products.length > 0 ? (
                        products.map((product, index) => (
                            <Product key={index} product={product} getProducts={getProducts}/>
                        ))
                    ) : (
                        <div>
                            There are no products 
                        </div>
                    )
                )}
            </div>
        </div>
    );
    
}
export default HomePage;