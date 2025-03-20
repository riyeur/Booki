// This component represents a custom book button
import React from 'react';
import '../styles/ProfilePageStyles.css'

const BookButton = ({onClick}) => {
    return (
        <div className='book-button-container'>
            <button className='book-button' onClick={onClick}>
                <img src="/booki_book_dark.png" alt="LLM Button" height='80' width='auto'/>
            </button>
        </div>
        
    );
};

export default BookButton;