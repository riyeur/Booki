// Reusable component (example: book info that's shown after the results are generated and in the user profile)
import React from 'react';
import '../styles/RegisterPageStyle.css';

const RegisterForm = () => {
    return (
        <div className='login-form'>
            {/* Wrapper for image and form */}
            <div className='login-content'>
                {/* Book image on the left side */}
                <img src='./book.png' alt='Book' className='book-image' />
                
                {/* Form section on the right side */}
                <div className='login-title-and-form'>
                    <h2 className='login-title'>Sign Up</h2>
                    <form className='form-section'>
                        <input 
                            type='email' 
                            placeholder='Enter your email' 
                            required 
                            className='email'
                        />
                        <input 
                            type='text' 
                            placeholder='Enter your username' 
                            required 
                            className='username'
                        />
                        <input 
                            type='password' 
                            placeholder='Enter your password' 
                            required 
                            className='password'
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
                <button className='login'>Login</button>
                <div className='continue-as-guest'>
                    <p className='continue-as'>or continue as </p>
                    <a href='url' className='guest'>Guest</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
