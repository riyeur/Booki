// This page contains the user's profile information and their saved bookmarks
import React from 'react';
import '../components/BookmarkList';
import '../styles/ProfilePageStyles.css';
import BookmarkList from '../components/BookmarkList';
import WelcomePanel from '../components/WelcomePanel';
import BookButton from '../components/BookButton';

const ProfilePage = () => {
    const handleClick = () => {
        alert('Change this to navigate to llm prompt page');
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