import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaBarsStaggered, FaXmark} from "react-icons/fa6";

import LogoutButton from './LogoutButton'; // Import LogoutButton
// Import LogoutButton

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navItems = [
        {path: "/", title: "Start a Search"},
        {path: "/my-job", title: "My Jobs"},
        {path: "/salary", title: "Salary Estimate"},
        {path: "/post-job", title: "Post a Job"},
    ]
  return (
    <header className='max-w-screen container mx-auto xl:px-24 px-4'>
        <nav className="flex justify-between items-center py-6">
            <a href="/" className="flex items-center gap-2 text-2xl text-black">
               
                <span style={{fontWeight:"bold"}} className="">OpportunityOrbit</span>
            </a>

            {/* {NAV ITEMS FOR LARGE DEVICES} */}
            <ul className="hidden md:flex gap-12">
                {
                    navItems.map(({path, title}) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink
                            to={path}
                    className={({ isActive}) => isActive ? "active": "" }
                  >
                    {title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>

            {/* SIGNUP AND LOGIN BUTTON */}
            <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                <Link to = "/login" className='py-2 px-5 border rounded'>Login</Link>
                <Link to = "/sign-up" className='py-2 px-5 border rounded bg-yellow-500 text-white'>Sign up</Link>
                {/* <Link to = "/LogoutButton" className='py-2 px-5 border rounded bg-blue text-white'>Logout</Link> */}
            </div>

            {/* MOBILE MENU */}
            <div className="md:hidden block">
                <button onClick={handleMenuToggler}>
                    {
                        isMenuOpen ? <FaXmark className='w-5 h-5 text-primary'/> : <FaBarsStaggered className='w-5 h-5 text-primary'/>
                    }
                </button>
            </div>
        </nav>

        {/* NAV ITEMS FOR MOBILE */}
        <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
            <ul className="">
            {navItems.map(({path, title}) => (
                        <li key={path} className="text-base text-white first:text-white py-1">
                            <NavLink
                            to={path}
                    className={({ isActive}) => isActive ? "active": "" }
                  >
                    {title}
                            </NavLink>
                        </li>
                    ))
                }

<li className="text-white py-1"><Link to = "/login">Login</Link></li>
<li className="text-white py-1"><Link to = "/login">Logout</Link></li>
            </ul>
        </div>
    </header>
  )
}

export default Navbar;
