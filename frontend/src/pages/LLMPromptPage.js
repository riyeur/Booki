import React from 'react';
import { useNavigate } from 'react-router-dom';
import LLMPromptForm from '../components/LLMPromptForm';
import '../styles/LLMPromptPageStyles.css'

const LLMPromptPage = () => {
    const navigate = useNavigate();

    const redirectUserProfile = () => {
        const token = sessionStorage.getItem('token');

        navigate('/profile');

        if (token) {
            navigate('/profile');
        } else {
            navigate('/');
        }
    }

    return (
        <div className='llm-prompt-page'>
            <div className='profile' onClick={redirectUserProfile}>
                <img className='profile-logo' src='/profile.png' alt='Profile pic' height='45' width='auto'/>
            </div>
            <LLMPromptForm></LLMPromptForm>
        </div>
    )
}

export default LLMPromptPage;