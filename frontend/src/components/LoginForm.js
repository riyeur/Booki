import React from 'react';

const LoginForm = () => {
    return (
        <div className='login-form'>
            <h2>Login</h2>
            <form>
                <input type='text' placeholder='Enter your username' required></input>
                <input type='password' placeholder='Enter your password' required></input>
                <input type='submit' value='Sign in'></input>
            </form>
            <hr></hr>
            <div>
                <p>Don't have an account?</p>
                <button>Register</button>
                <p>or continue as</p>
                <a href='url'>Guest</a>
            </div>
        </div>
    )
}

export default LoginForm;