import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginPageStyles.css'

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sign-in button clicked");
        try {
                console.log("Connecting to:", `${process.env.REACT_APP_BACKEND_URL}/api/user/login`);
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`,
                { username, password },
                { headers: { 'Content-Type': 'application/json' }}
            );

            console.log("Server:", response.data);

            if (response.data.token) {
                sessionStorage.setItem('token', response.data.token);
                navigate('/profile');
            }

        } catch (error) {
            setLoginFailed('Invalid username or password');
        }
    };

    const registerRoute = () => {
        navigate('/signup');
    }

    return (
        <div className='login-form'>
            <div className='login-title-and-form'>
                <h2 className='login-title'>Login</h2>
                <form className='form-section' onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter your username' required className='username' onChange={(e) => setUsername(e.target.value)}></input>
                    <input type='password' placeholder='Enter your password' required className='password' onChange={(e) => setPassword(e.target.value)}></input>
                    <input type='submit' value='Sign in' className='sign-in-button'></input>
                </form>
                {loginFailed && <p className='login-error'>{loginFailed}</p>}
            </div>
            <hr className='boundary'></hr>
            <div className='second-section'>
                <p className='dont-have-account'>Don't have an account?</p>
                <button className='register' onClick={registerRoute}>Register</button>
                <div className='continue-as-guest'>
                    <p className='continue-as'>or continue as </p>
                    <a href='/llm-prompt' className='guest'>Guest</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;