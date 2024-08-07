import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/operations/authAPI';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
    const { register, handleSubmit, reset, formState: { errors,isSubmitSuccessful } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [showPassword , setShowPassword] = useState(false);
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
        console.log("Login data is : ",data);
        dispatch(loginUser({...data,navigate}));
    }
  return (
    <div>
      <div>
        <div className='flex flex-col gap-y-9'>
            <div className='flex flex-col gap-y-4'>
                <h1 className='text-4xl font-semibold'>Sign In</h1>
                <p>Don't have an account yet ? 
                    <span className='text-green-500 font-semibold' >
                        <Link to={"/signup"}>
                           Sign Up
                        </Link>
                    </span></p>
            </div>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(Submit)}>
                <input
                 id='email'
                 name='email'
                 className='w-full focus:outline-none'
                 placeholder='Email Address'
                 {...register("email",{required:true})} 
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
                        className='w-full focus:outline-none '
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
                <div className='flex flex-row justify-between'>
                    <div className='flex items-center flex-row text-gray-500 gap-x-1'> <input type='checkbox' id='remember' name='remember' className='text-5xl'/> Remember Me</div>
                    <Link>Forgot Password ? </Link>
                </div>
                <button className='px-4 py-2 text-white bg-black rounded-lg' type='submit'> 
                    Sign In
                </button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
