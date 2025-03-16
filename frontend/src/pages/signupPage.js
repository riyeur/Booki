// Full page that represents the UI

import React from 'react';
import RegisterForm from '../components/RegisterForm'
import '../styles/RegisterPageStyle.css'

const SignupPage = () => {
    return (
        <div className='signup-page'>
            <div className='components'>
                <img className='booki-logo' src='/booki_logo.png' alt='Booki Logo' height='105' width='330'/>
                <RegisterForm></RegisterForm>
            </div>
        </div>
    )
}

export default SignupPage;