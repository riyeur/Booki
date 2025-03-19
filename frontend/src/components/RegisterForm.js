import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPageStyle.css';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setIsError(false);
                setRegistrationMessage(data.message);

                // This is so they can see the 'registration complete message'
                setTimeout(() => {
                    navigate('/');
                }, "1500");

            } else {
                setIsError(true);
                setRegistrationMessage(data.message);
            }
        } catch (error) {
            setIsError(true);
            setRegistrationMessage('Registration failed');
        }
    };
    
    return (
        <div className='register-form'>
            <div className='register-content'>
                <div className='register-book'>
                    <img src='./book.png' alt='Book' className='book-image' height='230' width='auto'/>
                </div>
                <div className='right-side'>
                    <div className='register-main-content'>
                        <div className='register-title-and-form'>
                            <h2 className='register-title'>Sign Up</h2>
                            <form className='register-form-section' onSubmit={handleSubmit}>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email' 
                                    required 
                                    className='register-email' 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input 
                                    type='text' 
                                    placeholder='Enter your username' 
                                    required 
                                    className='register-username' 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <input 
                                    type='password' 
                                    placeholder='Enter your password' 
                                    required 
                                    className='register-password' 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input type='submit' value='Register' className='register-button'/>
                            </form>
                            {registrationMessage && (
                                <p className={isError ? 'registration-error' : 'registration-success'}>
                                    {registrationMessage}
                                </p>
                            )}
                        </div>
                    </div>
                    <hr className='register-boundary'></hr>
                    <div className='register-second-section'>
                        <p className='register-already-have-account'>Already have an account?</p>
                        <button className='register-login' onClick={() => navigate('/')}>Login</button>
                        <div className='register-continue-as-guest'>
                            <p className='register-continue-as'>or continue as </p>
                            <a href='/llm-prompt' className='register-guest'>Guest</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;