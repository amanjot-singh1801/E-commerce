import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from "../slices/cartSlice";
import { RxCross2 } from 'react-icons/rx';

const Cart = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price , 0);
    };

    return (
        <div>
            <h2 className='text-2xl font-bold mb-4'>Cart</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id} className='flex justify-between items-center mb-6 '>
                        <img src={`/files/${item.image}`} alt={item.productName} className='w-16 h-16 object-cover' />
                        <div className='flex-1 ml-4'>
                            <h3 className='text-lg'>{item.productName}</h3>
                    
                        </div>
                        <div className='text-right'>
                            <p className='text-lg font-bold'>${item.price}</p>
                            <button className='text-red-500' onClick={() => handleRemove(item._id)}><RxCross2 /></button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='mt-4'>
                <h3 className='text-xl font-bold'>Subtotal: ${calculateTotal()}</h3>
                <h3 className='text-xl font-bold'>Total: ${calculateTotal()}</h3>
                <button className='w-full bg-black text-white py-2 mt-4'>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;
