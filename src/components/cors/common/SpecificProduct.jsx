import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { getSpecificDetail } from '../../../services/operations/productAPI';
import { useDispatch, useSelector } from 'react-redux';
import { add, noShowCart, remove } from '../../../slices/cartSlice';
import Cart from '../../../pages/Cart';
import { ImCross } from 'react-icons/im';

const SpecificProduct = ({setShowCart}) => {
    const {id} = useParams();
    console.log("id : ",id);

    const[details,SetDetails] = useState({});
    const {cart ,showCart} = useSelector((state)=> state.cart);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();



    const addToCart = () =>{
      // dispatch(add(product));
      dispatch(add(details));
    }

    const removeFromCart = () =>{
      // dispatch(add(product));
      dispatch(remove(details._id));
    }

    const show=(value)=>{
      dispatch(noShowCart(value));
    }

    useEffect(()=>{
        const getDetails = async()=>{
            const product = await getSpecificDetail(id,token);
            SetDetails(product);
            console.log("Details " ,product);
        }

        getDetails();
    },[]);

    console.log(details.productName);

  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <Navbar setShowCart={setShowCart}/>
      </div>

      <div className='flex justify-around gap-x-16 w-full  max-w-6xl mx-auto  items-start '>
        <div className='className=flex flex-col items-center justify-between mt-8
           hover:scale-110 trasnition duration-300 ease-in hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] gap-3 p-4 ml-5  rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
          {<img src={`/files/${details.image }`} width={250}/>}
        </div>
        <div className='flex justify-start flex-col p-3 max-w-lg gap-y-4 mt-4'>
           <div className='text-3xl font-bold ' >
            {details.productName}
           </div>

           <div className='text-gray-600'>
            {details.productDescription}
           </div>

           <div className='text-xl font-bold'>
            ${details.price}
           </div>

           <div className='mx-auto' >
                        {
                            cart?.find( (p) => p._id === details._id ) 
                            // true
                            ?
                            (<button
                            className="className='mx-auto bg-black px-20 py-3 text-white rounded-lg hover:scale-125 transition-all duration-200"
                            onClick={removeFromCart}
                            >
                            Remove Item 
                            </button>) :
                            (

                            <button
                            className="className='mx-auto bg-black px-20 py-3 text-white rounded-lg hover:scale-125 transition-all duration-200"
                            onClick={addToCart}>
                                Add to cart
                            </button>
                            )
                        }
            </div>

           <div className='flex items-center space-x-2 '>
            <p className='text-gray-800'>category :</p>
            <div>
              {details.category}
            </div>
           </div>
        </div>
      </div>
      {
                showCart && (
                    <div className='fixed inset-0 flex justify-end  z-50'>
                        <div className='absolute inset-0 bg-black opacity-50' onClick={() => show(false)}></div>
                        <div className='relative bg-white w-96 h-full shadow-lg p-6 items-center'>
                            <button className='absolute top-6 right-4 text-black' onClick={() => show(false)}><ImCross/></button>
                            <Cart />
                        </div>
                    </div>
                )
            }
    </div>
  )
}

export default SpecificProduct
