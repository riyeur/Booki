// This component represents a list of the user's bookmarks
import React from 'react';
import '../styles/ProfilePageStyles.css';
import BookmarkCard from './BookmarkCard';

const BookmarkList = ({title, bookmarks, buttonText, handleClick}) => {

    return (
        <div className='bookmark-list'>
            <p className='bookmarks-title'>{title}</p>
            <hr/>
            {   
                // looping through all the bookmarks and creating a BookmarkCard component for each
                bookmarks.map((bookmark) => (
                    // key isn't passed to BookmarkCard, its used internally as a unique identifier for 
                    // each card, and ensures that cards are only re-rendered if they have changed
                    <BookmarkCard 
                    key = {bookmark.id}
                    bookName = {bookmark.bookName}
                    authorName = {bookmark.authorName}
                    accessibilityInfo = {bookmark.accessibilityInfo}
                    bookDescription = {bookmark.bookDescription}
                    buttonText = {buttonText}
                    onButtonClick = {handleClick}
                    />
                ))
            }
        </div>
    );

};

export default BookmarkList;