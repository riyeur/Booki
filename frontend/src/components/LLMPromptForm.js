import React from 'react';
import { useState } from 'react';
import Genre from '../components/llm-prompt-form-components/Genre';

const LLMPromptForm = () => {

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