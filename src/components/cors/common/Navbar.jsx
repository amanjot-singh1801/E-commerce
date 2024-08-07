import React, { useState } from 'react';
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/operations/authAPI";
import image from "../../../images/Logo.png";
import { setShowCart } from '../../../slices/cartSlice';

const Navbar = () => {
  const { cart } = useSelector((state) => state.cart);
  const { showCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(navigate));
    setIsDropdownOpen(false);
  };

  const show=()=>{
    dispatch(setShowCart(true));
  }
  const getLinkClass = ({ isActive }) =>
    `text-2xl ${isActive ? 'text-black' : 'text-gray-400'}`;

  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/home">
          <img src={image} height="70" width="180" className="ml-5" />
        </NavLink>

        <div className="flex items-center font-medium mr-5 space-x-6">
          <NavLink to="/home" className={getLinkClass}>
            <p>Home</p>
          </NavLink>
          <NavLink to="/shop" className={getLinkClass}>
            <p>Shop</p>
          </NavLink>
          <NavLink to="/product" className={getLinkClass}>
            <p>Product</p>
          </NavLink>
          <NavLink to="/contactus" className={getLinkClass}>
            <p>Contact Us</p>
          </NavLink>
        </div>
        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="">
            <div className="relative text-black">
              <FaShoppingCart className="text-2xl" onClick={show}/>
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex justify-center items-center rounded-full text-white animate-bounce">
                  {cart.length}
                </span>
              )}
            </div>
          </NavLink>
          <div className="relative">
            <FaRegUserCircle
              className="text-black text-2xl cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white border border-gray-300 shadow-lg rounded-md w-20">
                <button
                  className="w-full text-left px-4 py-2 bg-black text-white rounded-md shadow-lg"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
