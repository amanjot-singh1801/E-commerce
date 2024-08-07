import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const AdminHome = () => {
  return (
    <div className='relative flex h-screen '>
        <Sidebar/>
        <div className='overflow-auto  w-full' >
            <div >
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AdminHome


