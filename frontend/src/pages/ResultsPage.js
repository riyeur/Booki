// This page contains the llm prompt results that users could save in their bookmarks
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ResultsPageStyles.css';
import BookmarkList from '../components/BookmarkList';
import axios from 'axios';

const ResultsPage = () => {
    const navigate = useNavigate();
    const ref = useRef(false)

    // This will help keep track of the state of the results
    const [results, setResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (!location.state?.fromPrompt) {
            navigate('/llm-prompt');
            return;
        }

        if (ref.current) return;
        ref.current = true;  

        const getResults = async () => {
            try {
                console.log("getResults in results page was called");
                const bookIDs = new URLSearchParams(location.search).get('books')?.split(',') || [];

                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/book/result`, 
                    { bookIDs }, 
                    { headers: { 'Content-Type': 'application/json' }}
                );

                if ((response.data.books)) {
                    setResults(response.data.books);
                } else {
                    setResults([]);
                }
            }
            catch (error){
                console.log("Error in result page:", error);
            }
        };
        getResults();
    }, [location.search, location.state?.fromPrompt, navigate]);
    
    const saveBookmark = () => {
        // add functionality to save bookmark here
    };

    const redirectUserProfile = () => {
        navigate('/profile');
    }

    return(
        <div className='results-page'>
            <div className='profile-icon' onClick={redirectUserProfile}>
                <img className='profile-logo' src='/profile.png' alt='Profile pic' height='60' width='auto'/>
            </div>
            <BookmarkList title = "Here are some book recommendations" bookmarks={results} buttonText = "Save" handleClick={saveBookmark}/>
        </div>
    );
};

export default ResultsPage;