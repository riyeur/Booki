// This page contains the user's profile information and their saved bookmarks
import React from 'react';
import '../components/BookmarkList';
import '../styles/ProfilePageStyles.css';
import BookmarkList from '../components/BookmarkList';

const ProfilePage = () => {
    return(
        <div className='profile-page'>
            <BookmarkList></BookmarkList>
        </div>
    );
};

export default ProfilePage;