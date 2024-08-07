import React from 'react'
import sofaImage from "../../../images/sofa.png";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Template = ({formType}) => {
    console.log(formType);
  return (
    <div>
        <div className='flex flex-row border-2 h-screen '>
            <div className='w-1/2 h-full background'>
                <img src={`${sofaImage}`} alt='loginImage' className='object-contain h-full w-full' />
            </div>

            <div className='w-1/2 h-full '>
                <div className='mt-40 ml-20 w-[456px]'>
                {
                    formType === "login" ? (
                        <div>
                            <LoginForm/>
                        </div>
                    ) : 
                    (
                        <div>
                            <SignupForm/>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
</div>
  )
}

export default Template
