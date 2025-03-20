// This component represents the welcome panel the user will see on their profile page with their name
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfilePageStyles.css'
import { getUsername } from '../services/getUsername';

const WelcomePanel = () => {
    const [username, setUsername] = useState("");
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        getUsername().then((name) => {
            setUsername(name[0].username);
        });
    }, []);

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