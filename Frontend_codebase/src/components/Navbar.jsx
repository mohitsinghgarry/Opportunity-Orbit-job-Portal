import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {FaBarsStaggered, FaXmark} from "react-icons/fa6";

import LogoutButton from './LogoutButton'; // Import LogoutButton
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';
// Import LogoutButton

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Track auth state
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
    };

    const navItems = [
        {path: "/", title: "Start a Search"},
        {path: "/my-job", title: "My Jobs"},
        {path: "/salary", title: "Salary Estimate"},
        {path: "/post-job", title: "Post a Job"},
    ];
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
                {!user ? (
                    <>
                        <Link to="/login" className='py-2 px-5 border rounded'>Login</Link>
                        <Link to="/sign-up" className='py-2 px-5 border rounded bg-yellow-500 text-white'>Sign up</Link>
                    </>
                ) : (
                    <>
                        <span className="font-semibold">{user.displayName || user.email}</span>
                        <button onClick={handleLogout} className='py-2 px-5 border rounded bg-blue-500 text-white'>Logout</button>
                    </>
                )}
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
                ))}
                {!user ? (
                    <>
                        <li className="text-white py-1"><Link to="/login">Login</Link></li>
                        <li className="text-white py-1"><Link to="/sign-up">Sign up</Link></li>
                    </>
                ) : (
                    <>
                        <li className="text-white py-1 font-semibold">{user.displayName || user.email}</li>
                        <li className="text-white py-1"><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
        </div>
    </header>
  )
}

export default Navbar;
