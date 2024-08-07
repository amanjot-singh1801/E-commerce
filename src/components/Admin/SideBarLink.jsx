import React from 'react'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom'

const SideBarLink = ({link}) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route , end: true  }, location.pathname)
      }
  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-black text-yellow-50"
          : ""
      } transition-all duration-200`}
    >
      {/* <span
        className={`absolute left-0 top-0 h-full w-[2rem] bg-black ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span> */}
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

export default SideBarLink
