import React, { useState } from 'react';
import Navbar from '../components/cors/common/Navbar';
import AllProducts from '../components/cors/common/AllProducts';
import Cart from './Cart';
import { ImCross } from "react-icons/im";
import { noShowCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const Home = () => {
    
    const {showCart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const show=(value)=>{
        dispatch(noShowCart(value));
    }

    return (
        <div className='relative'>
            <div className="text-black">
                <Navbar/>
            </div>
            <div className=''>
                <AllProducts  />
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
    );
}

export default Home;
