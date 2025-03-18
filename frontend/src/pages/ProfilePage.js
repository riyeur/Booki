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
                console.log("fetchBookmarks in profile page was called");
                const token = sessionStorage.getItem('token');
                console.log("token:", token);
                const response = await axios.post('http://localhost:5000/api/user/profile',
                    { token },
                    { headers: { 'Content-Type': 'application/json' }});
                
                if(response.data.bookmarks){
                    setBookmarks(response.data);
                }
                
            }
            catch (error){
                console.log("error in profile page:", error);
                setfetchFailed("Couldn't Retrieve Bookmarks...")
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
            {fetchFailed && <p className='fetch-error'>{fetchFailed}</p>}
            <BookmarkList title = "My Bookmarks" bookmarks={bookmarks} buttonText = "Delete" handleClick={deleteBookmark}/>
        </div>
    );
};

export default ProfilePage;