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
            <h1>Welcome back, {username}!</h1>
            <div className='signout-button-container'> 
                <button>Sign out</button> 
                </div>
        </div>
    );
};

export default WelcomePanel;