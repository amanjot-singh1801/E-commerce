import React from 'react'
import logo from "../../images/Logo.png";
import { sideBarLink } from '../../Data/sidebarLinks';
import SideBarLink from './SideBarLink';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (

    <div className="flex min-w-[220px] flex-col border-r-[1px] border-r-gray-200 bg-gray-100 py-10 h-full justify-between">
      <div>
        <div className='px-14  min-w-[220px] '>
            <img src={`${logo}`} alt='logo' height={40} width={150}/>
        </div>
        <div className='flex flex-col relative gap-5 mt-7 items-center font-semibold w-full'>
            {
                sideBarLink.map( (link,key) =>(
                    <SideBarLink key={link.id} link={link}/>
                ))
            }
        </div>
      </div>
      
      <div className='flex flex-col relative gap-5 mt-7 items-center font-semibold'>
        <button
            className='cursor-pointer' 
        >settings</button>
        <button
            className='cursor-pointer'
            onClick={()=> {dispatch(logout(navigate))}}
        >
            Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
