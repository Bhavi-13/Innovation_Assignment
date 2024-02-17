import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductContext } from '../ProductContext'

function Menu() {

    const context = useContext(ProductContext)
    const [ cart ] = context.productApi.cart

    // Check if token exists in local storage
    const isAuthenticated = localStorage.getItem('token') !== null;

    // Function to handle logout
    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            localStorage.removeItem('token');
            window.location.reload(true);
        }
        
    };
  
    return (
    <div className="navbar navbar-expand-md navbar-dark bg-secondary position-sticky top-0">
        <div className="container">
            <NavLink to={`/`} className="navbar-brand">E-Shop</NavLink>

            <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                <span className='navbar-toggler-icon'></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id='menu'>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={`/`} className="nav-link">Home</NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav d-flex gap-3">
                    <li className="nav-item">
                        <NavLink to={'/categories'} className='nav-link'>Categories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`/cart`} className="nav-link">
                       
                            <i className="bi bi-cart"></i> Cart 
                            <span className='badge text-bg-primary position-absolute bottom-10 start-10 translate-middle-y rounded-circle'>
                                { cart.length > 0 ? cart.length : 0 }
                            </span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                            {isAuthenticated ? (
                                <button className="btn btn-link nav-link" onClick={() => handleLogout()}>
                                    Logout
                                </button>
                            ) : (
                                <NavLink to={'/login'} className='nav-link'>Login</NavLink>
                            )}
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Menu
