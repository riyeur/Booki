import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const SimilarBooks = () => {
    return (
        <div className='similar-books'>
            <label className='similar-books-label'>Similar Books</label>
            <div className='similar-books-box'>
                <textarea rows={4} cols={62} placeholder='Please seperate book titles with commas.' className='similar-books-input'></textarea>
            </div>
        </div>
    );
}

export default SimilarBooks;