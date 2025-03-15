// This component represents a custom book button
import React from 'react';
import '../styles/ProfilePageStyles.css'

const BookButton = ({onClick}) => {
    return (
        <div className='book-button-container'>
            <button className='book-button' onClick={onClick}>
                <img src="/booki_book.png" alt="LLM Button" />
            </button>
        </div>
        
    );
};

export default BookButton;