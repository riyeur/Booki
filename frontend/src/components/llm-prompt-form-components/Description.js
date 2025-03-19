import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Description = ({name,value,onChange}) => {
    return (
        <div className='description'>
            <label className='description-label'>Description</label>
            <div className='extra-description'>
                <textarea rows={10} cols={62} className='description-input' name={name} value={value} onChange={onChange}></textarea>
            </div>
        </div>
    );
}

export default Description;