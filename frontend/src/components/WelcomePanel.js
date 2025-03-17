// This component represents the welcome panel the user will see on their profile page with their name
import React, {useState, useEffect} from 'react';
import '../styles/ProfilePageStyles.css'
import { getUsername } from '../services/getUsername';

const WelcomePanel = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        getUsername().then((name) => {
            setUsername(name[0].username);
        });
    }, []);

    return(
        <div className='welcome-panel'>
            <p className='welcome-back'>Welcome back, {username}!</p>
            <div className='signout-button-container'> 
                <button className='sign-out'>Sign out</button> 
                </div>
        </div>
    );
};

export default WelcomePanel;