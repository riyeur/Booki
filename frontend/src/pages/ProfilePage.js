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

    const [bookmarks, setBookmarks] = useState([]);
    const [Username, setUsername] = useState('');
    const [fetchFailed, setfetchFailed] = useState('');

    // This will run everytime the bookmarks variable changes and will fetch the bookmarks from the database
    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/bookmarks`,
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
    }, [bookmarks]);

    // This will run once (when the component is mounted) and will fetch the username from the database
    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/username`,
                    {},
                    { 
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                
                if(response.data.username){
                    setUsername(response.data.username);
                }
                else {
                    setUsername("Booki User");
                }

            }
            catch (error){
                setUsername("Booki User");
            }
        };
        fetchUsername();
    }, []);

    const goToPromptPage = () => {
        navigate('/llm-prompt');
      };
    
    const deleteBookmark = async (bookId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/user/bookmarks/${bookId}`);
            setBookmarks( (prevBookmarks) => prevBookmarks.filter( (bookmark) => bookmark.bookId !== bookId));
        }
        catch (error){
            // don't delete the bookmark if error
        }
    };

    return(
        <div className='profile-page'>
            <BookButton onClick={goToPromptPage}/>
            <WelcomePanel username={Username}/>
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