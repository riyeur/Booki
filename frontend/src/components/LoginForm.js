import React from 'react';
import '../styles/LoginPageStyles.css'

const LoginForm = () => {
    return (
        <div className='login-form'>
            <div className='login-title-and-form'>
                <h2 className='login-title'>Login</h2>
                <form className='form-section'>
                    <input type='text' placeholder='Enter your username' required className='username'></input>
                    <input type='password' placeholder='Enter your password' required className='password'></input>
                    <input type='submit' value='Sign in' className='sign-in-button'></input>
                </form>
            </div>
            <hr className='boundary'></hr>
            <div className='second-section'>
                <p className='dont-have-account'>Don't have an account?</p>
                <button className='register'>Register</button>
                <div className='continue-as-guest'>
                    <p className='continue-as'>or continue as </p>
                    <a href='url' className='guest'>Guest</a>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;