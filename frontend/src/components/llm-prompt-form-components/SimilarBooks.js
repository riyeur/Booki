import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const SimilarBooks = ({name, value, onChange}) => {
    return (
        <div className='similar-books'>
            <label className='similar-books-label'>Similar Books</label>
            <div className='similar-books-box'>
                <textarea rows={4} cols={70} placeholder='Please seperate book titles with commas.' className='similar-books-input' name={name} value={value} onChange={onChange}></textarea>
            </div>
        </div>
    );
}

export default SimilarBooks;