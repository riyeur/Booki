import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPageStyle.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Call your backend API to register the user
            const response = await fetch('http://localhost:3000/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                // Registration successful - redirect to login page
                navigate('/login');
            } else {
                // Handle registration errors
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className='login-form'>
            <div className='login-content'>
                <img src='./book.png' alt='Book' className='book-image' />
                
                <div className='login-title-and-form'>
                    <h2 className='login-title'>Sign Up</h2>
                    <form className='form-section' onSubmit={handleSubmit}>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            required
                            className='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter your username'
                            required
                            className='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Enter your password'
                            required
                            className='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type='submit'
                            value='Register'
                            className='register-button'
                        />
                    </form>
                </div>
            </div>
            <hr className='boundary'></hr>
            <div className='second-section'>
                <p className='already-have-account'>Already have an account?</p>
                <button className='login' onClick={() => navigate('/login')}>Login</button>
                <div className='continue-as-guest'>
                    <p className='continue-as'>or continue as </p>
                    <a href='/' className='guest'>Guest</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;