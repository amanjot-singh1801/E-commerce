import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {addUser} from "../../../services/operations/authAPI";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {setSignupData} from "../../../slices/authSlice";
import { useDispatch } from 'react-redux';


const SignupForm = () => {

    const { register, handleSubmit, reset, formState: { errors,isSubmitSuccessful } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword,setShowPassword] = useState(false);
    useEffect(()=>{
        if(isSubmitSuccessful){
          reset({
              email:"",
              yourname:"",
              username:"",
              password:"",
          })
        }  
    },[reset,isSubmitSuccessful]);

    const Submit = (data) =>{
        console.log(data);
        dispatch(setSignupData(data));
        addUser({...data,navigate});
    }
  return (
    <div >
        <div className='flex flex-col gap-y-9'>
            <div className='flex flex-col gap-y-4'>
                    <h1 className='text-4xl font-semibold'>Sign Up</h1>
                    <p>Already Have an account? 
                        <span className='text-green-500 font-semibold' >
                            <Link to={"/login"}>
                            Sign In
                            </Link>
                        </span>
                    </p>
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(Submit)}>
                <input
                    id='yourname'
                    name='yourname'
                    className='w-full focus:outline-none'
                    placeholder='Your Name'
                    {...register("yourname" , {required:true})}
                />
                {
                    errors.yourname && (
                        <span>Your Name is required</span>
                    )
                }
                <div className='w-full bg-gray-300 h-[1px] '></div>

                <input
                    id='username'
                    name='username'
                    className='w-full focus:outline-none'
                    placeholder='User Name'
                    {...register("username" , {required:true})}
                />
                {
                    errors.yourname && (
                        <span>User Name is required</span>
                    )
                }
                <div className='w-full bg-gray-300 h-[1px] '></div>

                <input
                    id='email'
                    name='email'
                    className='w-full focus:outline-none'
                    placeholder='Email Address  '
                    {...register("email" , {required:true})}
                />
                {
                    errors.yourname && (
                        <span>Email is required</span>
                    )
                }
                <div className='w-full bg-gray-300 h-[1px] '></div>

                <div className='relative'>
                    <input
                        id='password'
                        type={showPassword ? "text" : "password"}
                        name='password'
                        className='w-full focus:outline-none'
                        placeholder='Password'
                        {...register("password" , {required:true})}
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-0 top-[2px] cursor-pointer"
                        >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                 </div>
                {
                    errors.yourname && (
                        <span>Password is required</span>
                    )
                }
                <div className='w-full bg-gray-300 h-[1px] '></div>
                
                <div className='flex flex-row items-center  gap-x-1'> <input type='checkbox' id='remember' name='remember' /> <span className='text-gray-500'>I agree with </span> Privacy Policy <span className='text-gray-500'> and </span > Terms of Use</div>
                <button type='submit' className='w-full px-4 py-2 text-white bg-black rounded-lg '>
                    Sign Up
                </button>

            </form>
            
        </div>
    </div>
  )
}

export default SignupForm
