import React from 'react';
import LLMPromptForm from '../components/LLMPromptForm';
import '../styles/LLMPromptPageStyles.css'

const LLMPromptPage = () => {
    return (
        <div className='llm-prompt-page'>
            <div className='profile'>
                <img className='profile-logo' src='/profile.png' alt='Profile pic' height='45' width='auto'/>
            </div>
            <LLMPromptForm></LLMPromptForm>
        </div>
    )
}

export default LLMPromptPage;