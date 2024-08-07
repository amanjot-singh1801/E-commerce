import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RiImageAddLine } from "react-icons/ri";
import { FaEdit, FaPlus } from "react-icons/fa";

import { addNewProduct, updateProduct } from "../../services/operations/productAPI";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AddNewProduct = () => {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, setValue, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { product, isEditMode } = location.state || {};
  const {token} = useSelector( (state)=> state.auth);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setSelectedImage(null);
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (isEditMode && product) {
      setValue('productName', product.productName);
      setValue('productDescription', product.productDescription);
      setValue('price', product.price);
      setValue('category', product.category);
      setSelectedImage(`/files/${product.image}`);
    }
  }, [isEditMode, product, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('productName', data.productName);
    formData.append('productDescription', data.productDescription);
    formData.append('price', data.price);
    formData.append('category', data.category);


    if (data.productImage && data.productImage.length > 0) {
      formData.append('productImage', data.productImage[0]);
    }

    if (isEditMode) {
      // formData.append('_id', product._id);
      dispatch(updateProduct(formData, navigate,product._id,token));
      console.log("Updated Product");
    } else {
      dispatch(addNewProduct(formData, navigate,token));
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
      setValue('productImage', event.target.files);
    }
  };

  return (
    <div className="mt-10">
      <p className='text-2xl ml-8'>{isEditMode ? 'Edit Product' : 'Add New Product'}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-x-40 mt-10">
        <div className="flex flex-col mb-4 ml-20">
          <label className="mb-2 text-lg font-bold">Upload Image</label>
          <div className="flex items-center gap-2">
            <input
              {...register('productImage', { required: !isEditMode })}
              id="productImage"
              className="hidden"
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <button
              type="button"
              onClick={handleFileInputClick}
              className="flex items-center gap-2 px-4 py-2 text-9xl rounded-md shadow-md"
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="w-24 h-24 object-cover rounded-md" />
              ) : (
                <RiImageAddLine />
              )}
            </button>
          </div>
          {errors.productImage && <span className="text-red-500">Product Image is required</span>}
        </div>
        <div className='w-full max-w-[680px]'>
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-lg font-bold" htmlFor="productName">Add Product Title</label>
            <input
              {...register('productName', { required: true })}
              id="productName"
              placeholder='Product Name'
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="text"
            />
            {errors.productName && <span className="text-red-500">Product Name is required</span>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 text-lg font-bold" htmlFor="productDescription">Product Description</label>
            <textarea
              {...register('productDescription', { required: true })}
              id="productDescription"
              placeholder='Product Description'
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              rows="3"
            />
            {errors.productDescription && <span className="text-red-500">Product Description is required</span>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 text-lg font-bold" htmlFor="price">Price</label>
            <input
              {...register('price', { required: true })}
              id="price"
              placeholder='Product Price'
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="number"
            />
            {errors.price && <span className="text-red-500">Price is required</span>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 text-lg font-bold" htmlFor="category">Category</label>
            <input
              {...register('category', { required: true })}
              id="category"
              placeholder='Product Category'
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
              type="text"
            />
            {errors.category && <span className="text-red-500">Category is required</span>}
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 mt-4 text-lg font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isEditMode ? <><FaEdit /> Edit Product</> : <><FaPlus /> Add Product</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
