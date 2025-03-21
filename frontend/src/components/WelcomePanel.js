// This component represents the welcome panel the user will see on their profile page with their name
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePageStyles.css'

const WelcomePanel = ({username}) => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const signOutButton = () => {
        if (token) {
            sessionStorage.clear();
        }
        navigate('/');
    }

    return(
        <div className='welcome-panel'>
            <p className='welcome-back'>Welcome back, {username}!</p>
            <div className='signout-button-container'> 
                <button className='sign-out' onClick={signOutButton}>Sign out</button> 
                </div>
        </div>
    );
};

export default WelcomePanel;