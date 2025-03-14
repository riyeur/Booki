import React from 'react';
import Genre from '../components/llm-prompt-form-components/Genre';
import AgeGroup from '../components/llm-prompt-form-components/AgeGroup';
import Length from '../components/llm-prompt-form-components/Length';
import Author from '../components/llm-prompt-form-components/Author';
import Language from '../components/llm-prompt-form-components/Language';

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
                    <AgeGroup></AgeGroup>
                    <Length></Length>
                    <Author></Author>
                    <Language></Language>
                </form>
            </div>
        </div>
    );
}

export default LLMPromptForm;