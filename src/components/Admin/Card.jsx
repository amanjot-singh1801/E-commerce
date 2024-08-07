import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteProduct } from '../../services/operations/productAPI';
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  add, remove } from "../../slices/cartSlice";


const Card = ({product,onDelete}) => {

    const {userType} = useSelector((state)=> state.auth);
    console.log("userType",userType);
    const dispatch = useDispatch();
    const {cart} = useSelector((state)=> state.cart);
    const navigate = useNavigate();
    const {token} = useSelector((state)=> state.auth);
    

    const addToCart = (event) =>{
        event.stopPropagation();
        console.log('Add to Cart Clicked', product);
        // dispatch(add(product));
        dispatch(add(product));
      }

    
      console.log("cart is : ",cart);

      const removeFromCart = (event) =>{
        event.stopPropagation();
        dispatch(remove(product._id));
      }

    
    const editProduct = ()=>{
        navigate("/adminhome/addnewproduct", { state: { product, isEditMode: true } });
    }

    const DeleteProduct = (id)=>{
        deleteProduct(id,token);
        onDelete(id);
    }
    
    const handleMainDivClick=()=>{
        console.log("Navigate clicked");
        navigate(`/products/${product._id}`);
    }

  return (
    <div onClick={userType === "user" ? handleMainDivClick : undefined}>

   
    <div className='flex flex-col items-center justify-between mt-8
                hover:scale-110 transition duration-300 ease-in gap-3 p-4 ml-5 '
    >
      <div  >
        <div className='relative'>
            <img src={`/files/${product.image}`}   width={220} height={150} alt={product.productName}/>
            <span className='absolute top-2 left-4 font-bold'>New</span>
        </div>
            
            <div className='flex flex-col gap-y-2 text-lg font-semibold'>
                <p>{product.productName}</p>
                <p>${product.price}</p>
            </div>
            

            {
                (userType === "admin") ? (
                    <div className='flex justify-between mt-3 items-center'>
                        <div>
                            <MdOutlineModeEdit className='text-2xl cursor-pointer' onClick={()=>editProduct(product.id)}/>
                        </div>
                        <div className=' cursor-pointer rounded-full p-2 bg-red-500'>
                            <RiDeleteBin5Line onClick={()=>DeleteProduct(product._id)}/>
                        </div>
                    </div>
                ): (
                    <div className='flex justify-center w-full mt-2' >
                        {
                            cart.find( (p) => p._id === product._id ) 
                            // true
                            ?
                            (<button
                            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase
                            hover:bg-gray-700  hover:text-white transition duration-300 ease-in w-full"
                            onClick={removeFromCart}
                            >
                            Remove Item 
                            </button>) :
                            (

                            <button
                            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase
                            hover:bg-gray-700  hover:text-white transition duration-300 ease-in w-full "
                            onClick={addToCart}>
                                Add to cart
                            </button>
                            )
                        }
                    </div>
                )
            }
      </div>
    </div>
    </div>
  )
}

export default Card
