// This page contains the user's profile information and their saved bookmarks
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/BookmarkList';
import '../styles/ProfilePageStyles.css';
import {getBookmarks} from "../services/getBookmarks";
import BookmarkList from '../components/BookmarkList';
import WelcomePanel from '../components/WelcomePanel';
import BookButton from '../components/BookButton';

const ProfilePage = () => {
    const navigate = useNavigate();

    // This will help keep track of the state of the bookmarks
    const [bookmarks, setBookmarks] = useState([]);

    // This will run once (when the component is mounted) and will fetch the bookmark data from the database
    useEffect(() => {
        getBookmarks().then((bookmarkData) => {
            setBookmarks(bookmarkData);
        });
    }, []);

    const goToPromptPage = () => {
        navigate('/llm-prompt');
      };
    
    const deleteBookmark = () => {
        // add functionality to delete bookmark here
    };

    return(
        <div className='profile-page'>
            <BookButton onClick={goToPromptPage}/>
            <WelcomePanel/>
            <BookmarkList title = "My Bookmarks" bookmarks={bookmarks} buttonText = "Delete" handleClick={deleteBookmark}/>
        </div>
    );
};

export default ProfilePage;