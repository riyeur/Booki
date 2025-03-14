import React from 'react';
import LoginForm from '../components/LoginForm'
import '../styles/LoginPageStyles.css'

const LoginPage = () => {
    return (
        <div className='login-page'>
            <div className='components'>
                <img className='booki-logo' src='/booki_logo.png' alt='Booki Logo' height='105' width='auto'/>
                <LoginForm></LoginForm>
            </div>
        </div>
    )
}

export default LoginPage;