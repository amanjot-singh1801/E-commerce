import React, { useEffect, useState } from 'react'
import { fetchAllProducts } from '../../../services/operations/productAPI';
import { setProducts } from '../../../slices/productSlice';
import Card from '../../Admin/Card';
import { useDispatch, useSelector } from 'react-redux';

const AllProducts = ({setShowCart}) => {
    const dispatch = useDispatch();
    const {products} = useSelector((state)=> state.product);

    const {token} = useSelector((state)=>state.auth);
    const [allProducts, setAllProducts] = useState(null);
    useEffect( ()=>{
        const getProducts =async ()=>{
            try{
                console.log("Token type");
                console.log(typeof(token));
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
  return (
    <div>
            {
                <div className=' grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl  mx-auto space-x-5 '>
                    {
                         allProducts && allProducts.length > 0 ? (
                            allProducts.map((product) => (
                                <Card product={product} key={product._id } setShowCart={setShowCart} />
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
  )
}

export default AllProducts
