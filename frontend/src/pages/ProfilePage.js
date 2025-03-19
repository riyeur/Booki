// This page contains the user's profile information and their saved bookmarks
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/BookmarkList';
import '../styles/ProfilePageStyles.css';
import BookmarkList from '../components/BookmarkList';
import WelcomePanel from '../components/WelcomePanel';
import BookButton from '../components/BookButton';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();

    // This will help keep track of the state of the bookmarks
    const [bookmarks, setBookmarks] = useState([]);
    const [fetchFailed, setfetchFailed] = useState('');

    // This will run once (when the component is mounted) and will fetch the bookmark data from the database
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.post('http://localhost:5000/api/user/profile',
                    {},
                    { 
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                
                if(response.data.bookmarks && response.data.bookmarks.length !== 0){
                    setBookmarks(response.data.bookmarks);
                    setfetchFailed('');
                }
                else {
                    setBookmarks([]);
                    setfetchFailed("You don't have any bookmarks yet. Click on the book icon on the top right to start saving some!");
                }

            }
            catch (error){
                setfetchFailed("Oops! Something went wrong. Please try again later.");
            }
        };
        fetchBookmarks();
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
            {fetchFailed && <div className='fetch-error'> 
                <p className='bookmarks-title'>My Bookmarks</p>
                <hr/>
                <p className='bookmarks-message'>{fetchFailed}</p>
                </div>
            }
            {!fetchFailed && <BookmarkList title = "My Bookmarks" bookmarks={bookmarks} buttonText = "Delete" handleClick={deleteBookmark}/>}
        </div>
    );
};

export default ProfilePage;