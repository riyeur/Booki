import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Description = () => {
    return (
        <div className='description'>
            <label className='description-label'>Description</label>
            <div className='extra-description'>
                <textarea rows={10} cols={70} className='description-input'></textarea>
            </div>
        </div>
    );
}

export default Description;