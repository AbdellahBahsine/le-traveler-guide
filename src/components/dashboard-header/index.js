import {useState} from 'react';
import './dashboard-header.styles.css';

import {Link} from "react-router-dom";

import { useDispatch } from 'react-redux';
import { setLogout } from '../../features/user/userSlice';

import Cookies from 'js-cookie';
import axios from 'axios';

const DashboardHeaderComponent = () => {

    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const dispatch = useDispatch();

    const handleLogout = () => {
        axios.delete('https://api-le-traveler-guide.herokuapp.com/api/logout', { headers: { 
            Accept: 'application/json',
            Authorization: `Bearer ${Cookies.get('authToken')}` 
        } })
        .then(res => {
            dispatch(setLogout())
            Cookies.remove('authToken')
        })
        .catch(err => console.log(err))
    }

    const handleClick = () => {
        setOpen(!open)
    }

    const handleMenu = () => {
        setIsMobile(!isMobile)
    }

    return (
        <header className="dashboard-header-component">
            <Link to="/" className="logo">Le Traveler Guide</Link>
            
            <nav className="menu">
                <Link to="/home">Home</Link>
                <Link to="/articles">Articles</Link>
                <div className="login-links">
                    <i className="fa fa-chevron-down" onClick={handleClick}></i>
                    <div className={open ? "login-links__inner open" : "login-links__inner"}>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link onClick={handleLogout} to="/">Logout</Link>
                    </div>
                </div>
            </nav>

            <div class="mobile-menu">
                <div className="bars"><i className="fas fa-bars" onClick={handleMenu}></i></div>
                <nav className={isMobile ? "mobile-menu__nav show" : "mobile-menu__nav"}>
                    <Link className="mobile-menu__nav__item" to="/">Home</Link>
                    <Link className="mobile-menu__nav__item" to="/articles">Articles</Link> 
                    <Link className="mobile-menu__nav__item" onClick={handleLogout} to="/">Logout</Link>
                </nav>
            </div>
        </header>
    )
}

export default DashboardHeaderComponent;