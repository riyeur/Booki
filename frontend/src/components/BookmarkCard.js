// This component represents a single bookmark
import React from 'react';
import '../styles/ProfilePageStyles.css'

const BookmarkCard = ({bookName, authorName, accessibilityInfo, bookDescription}) => {
    return (
        <div className='bookmark-card'>
            <h2>{bookName}</h2>
            <h3>Author: {authorName}</h3>
            <p>Accessibility: {accessibilityInfo}</p>
            <p>Description: {bookDescription}</p>
            <button>Delete</button>
        </div>
    );
};

export default BookmarkCard;