import React from 'react';
import { useState } from 'react';
import Genre from '../components/llm-prompt-form-components/Genre';

const LLMPromptForm = () => {

    const genres = [
        "Action", "Biographical", "Chick Lit", "Children's", "Classics",
        "Contemporary", "Fantasy", "Fiction", "Historical Fiction", "History",
        "Horror", "Humor and Comedy", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Psychology", "Romance", "Science", "Science Fiction",
        "Self Help", "Sports", "Thriller", "Young Adult"
    ];

    return (
        <div className='llm-prompt-form'>
            <div className='question'>
                <h4>What kind of book would you like to read?</h4>
                <hr />
            </div>
            <div className='llm-prompt-form-inputs'>
                <form className='form-inputs'>
                    <Genre></Genre>
                </form>
            </div>
        </div>
    );
}

export default LLMPromptForm;