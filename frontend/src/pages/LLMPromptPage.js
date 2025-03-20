import React from 'react';
import { useNavigate } from 'react-router-dom';
import LLMPromptForm from '../components/LLMPromptForm';
import '../styles/LLMPromptPageStyles.css'

const LLMPromptPage = () => {
    const navigate = useNavigate();

    const redirectUserProfile = () => {
        navigate('/profile');
    }

    return (
        <div className='llm-prompt-page'>
            <div className='profile' onClick={redirectUserProfile}>
                <img className='profile-logo' src='/profile.png' alt='Profile pic' height='60' width='auto'/>
            </div>
            <LLMPromptForm></LLMPromptForm>
        </div>
    )
}

export default LLMPromptPage;