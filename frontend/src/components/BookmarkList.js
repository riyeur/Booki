// This component represents a list of the user's bookmarks
import React, { useEffect, useState }  from 'react';
import '../styles/ProfilePageStyles.css';
import BookmarkCard from './BookmarkCard';
import {getBookmarks} from "../services/getBookmarks";

const BookmarkList = () => {
    // This will help keep track of the state of the bookmarks
    const [boookmarks, setBookmarks] = useState([]);

    // This will run once (when the component is mounted) and will fetch the bookmark data from the database
    useEffect(() => {
        getBookmarks().then((bookmarkData) => {
            setBookmarks(bookmarkData);
        });
    }, []);

    return (
        <div className='bookmark-list'>
            {
                // looping through all the bookmarks and creating a BookmarkCard component for each
                boookmarks.map((bookmark) => (
                    // key isn't passed to BookmarkCard, its used internally as a unique identifier for 
                    // each card, and ensures that cards are only re-rendered if they have changed
                    <BookmarkCard 
                    key = {bookmark.id}
                    bookName = {bookmark.bookName}
                    authorName = {bookmark.authorName}
                    accessibilityInfo = {bookmark.accessibilityInfo}
                    bookDescription = {bookmark.bookDescription}
                    />
                ))
            }
        </div>
    );

};

export default BookmarkList;