// This page contains the llm prompt results that users could save in their bookmarks
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResultsPageStyles.css';
import {getBookmarks} from "../services/getBookmarks";
import BookmarkList from '../components/BookmarkList';

const ResultsPage = () => {
    const navigate = useNavigate();

    // This will help keep track of the state of the bookmarks
    const [bookmarks, setBookmarks] = useState([]);

    // This will run once (when the component is mounted) and will fetch the bookmark data from the database
    useEffect(() => {
        getBookmarks().then((bookmarkData) => {
            setBookmarks(bookmarkData);
        });
    }, []);
    
    const saveBookmark = () => {
        // add functionality to save bookmark here
    };

    const redirectUserProfile = () => {
        const token = sessionStorage.getItem('token');

        if (token) {
            navigate('/profile');
        } else {
            navigate('/');
        }
    }

    return(
        <div className='results-page'>
            <div className='profile-icon' onClick={redirectUserProfile}>
                <img className='profile-logo' src='/profile.png' alt='Profile pic' height='60' width='auto'/>
            </div>
            <BookmarkList title = "Here are some book recommendations" bookmarks={bookmarks} buttonText = "Save" handleClick={saveBookmark}/>
        </div>
    );
};

export default ResultsPage;