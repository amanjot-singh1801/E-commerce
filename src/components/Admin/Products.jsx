import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllProducts } from '../../services/operations/productAPI';
import { setProducts } from '../../slices/productSlice';
import Card from './Card';
const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {products} = useSelector((state)=> state.product);
    const {token} = useSelector((state)=>state.auth);
    const [allProducts, setAllProducts] = useState(null);
    useEffect( ()=>{
        const getProducts =async ()=>{
            try{
                const productsData = await fetchAllProducts(token);
                dispatch(setProducts(productsData));
                setAllProducts(productsData);
                console.log("all products is : ",products);

            }catch(error){
                console.error("Failed to fetch products:", error);
            }
        }

        getProducts();
    },[]);

    const handleDelete = (id) => {
        const updatedProducts = allProducts.filter(product => product._id !== id);
        setAllProducts(updatedProducts);
    };
  return (
    <div >
      <div >
        <div className='flex justify-center mt-7'>
            <button className='flex items-center gap-2 text-4xl shadow-md shadow-gray-500 rounded-md px-4 py-2 border-t-2 border-gray-500'
                onClick={()=>{navigate("/adminhome/addnewproduct")}}
             >
                <FaPlus/>
                <p>Add New Product</p>
            </button>
        </div>

        <div>
            {
                <div className=' grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 max-w-6xl mx-auto space-x-2 '>
                    {
                         allProducts && allProducts.length > 0 ? (
                            allProducts.map((product) => (
                                <Card product={product} key={product._id } onDelete={handleDelete}/>
                                // <div key={product._id}>
                                //     <img src={require(`../../files/${product.image}`)} alt={product.productName} />
                                //     <p>{product.productName}</p>
                                //     <p>{product.productDescription}</p>
                                //     <p>{product.price}</p>
                                // </div>
                            ))
                        ) : (
                            <p>No products available</p>
                        )
                    }
                </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Products
