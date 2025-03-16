// Full page that represents the UI

import React from 'react';
import RegisterForm from '../components/RegisterForm'
import '../styles/RegisterPageStyle.css'

const SignupPage = () => {
    return (
        <div className='signup-page'>
            <div className='components'>
                <RegisterForm></RegisterForm>
            </div>
        </div>
    )
}

export default SignupPage;