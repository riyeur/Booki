import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Author = () => {
    return (
        <div className='author'>
            <label className='author-label'>Author</label>
            <div className='author-name'>
                <input type='text' placeholder='Optional' className='author-input'></input>
            </div>
        </div>
    );
}

export default Author;