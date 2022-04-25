import {useState} from 'react';
import './login.styles.css';

import axios from 'axios';
import Cookies from 'js-cookie';

import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../../features/user/userSlice';

const LoginPage = () => {

    const [credentials, setCredentials] = useState({name: '', password: ''})
    
    const {name, password} = credentials

    const dispatch = useDispatch()

    const handleChange = e => {
        const {name, value} = e.target
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('https://api-le-traveler-guide.herokuapp.com/api/login', credentials)
        .then(res => {
            if(!res.data.Error){
                dispatch(setLoggedUser(res.data.user))
                Cookies.set('authToken', res.data.token);
            }
        })
        .catch(err => console.log(err.response))
    }

    return (
        <div className="login-page">
            <div className="login__image"></div>
            <h2>Login</h2>
            <div className="credentials">
                <p><strong>Username: </strong>admin</p>
                <p><strong>Password: </strong>123456789</p>
            </div>
            <div className="username__container">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" name="name" value={name} onChange={handleChange} />
            </div>
            <div className="password__container">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
            </div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default LoginPage;