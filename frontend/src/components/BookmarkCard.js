// This component represents a single bookmark
import React from 'react';
import '../styles/ProfilePageStyles.css'

const BookmarkCard = ({bookName, authorName, accessibilityInfo, bookDescription, buttonText, onButtonClick}) => {
    return (
        <div className='bookmark-card'>
            <h2>{bookName}</h2>
            <h3><span className='dark-text'>Author: </span>{authorName}</h3>
            <p><span className='dark-text'>Accessibility: </span>{accessibilityInfo}</p>
            <p><span className='dark-text'>Description: </span>{bookDescription}</p>
            <div className='delete-button-container'> 
                <button onClick={onButtonClick}>{buttonText}</button> 
                </div>
            <hr/>
        </div>
    );
};

export default BookmarkCard;