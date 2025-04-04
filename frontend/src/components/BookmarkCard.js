// This component represents a single bookmark
import React from 'react';
import '../styles/ProfilePageStyles.css'

const BookmarkCard = ({bookId, bookName, authorName, accessibilityInfo, bookDescription, buttonText, onButtonClick, isLoggedIn = true, savedBookIds = []}) => {
    const isSaved = savedBookIds.includes(bookId);
    const isDisabled = !isLoggedIn || isSaved;

    const handleButtonClick = () => {
        if (!isDisabled) {
            onButtonClick(bookId);
        }
    };

    return (
        <div className='bookmark-card'>
            <h2 className='book-name-text'>{bookName}</h2>
            <h3><span className='dark-text'>Author: </span>{authorName}</h3>
            <p><span className='dark-text'>Accessibility: </span>{accessibilityInfo}</p>
            <p><span className='dark-text'>Description: </span>{bookDescription}</p>
            <div className='delete-button-container'> 
                <button className={isDisabled ? 'button-for-saving-and-deleting-disabled-button' : 'button-for-saving-and-deleting'} disabled={isDisabled} onClick={handleButtonClick}> {isSaved ? 'Saved' : buttonText}</button> 
            </div>
            <hr/>
        </div>
    );
};

export default BookmarkCard;