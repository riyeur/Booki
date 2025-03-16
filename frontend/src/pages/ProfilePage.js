// This page contains the user's profile information and their saved bookmarks
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/BookmarkList';
import '../styles/ProfilePageStyles.css';
import BookmarkList from '../components/BookmarkList';
import WelcomePanel from '../components/WelcomePanel';
import BookButton from '../components/BookButton';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/llm-prompt');
      };
    return(
        <div className='profile-page'>
            <BookButton onClick={handleClick}/>
            <WelcomePanel></WelcomePanel>
            <BookmarkList></BookmarkList>
        </div>
    );
};

export default ProfilePage;