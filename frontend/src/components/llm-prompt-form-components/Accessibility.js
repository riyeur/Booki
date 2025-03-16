import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Accessibility = () => {
    
    const types = [
        "Physical Book", "E-book", "Audiobook"
    ];

    return (
        <div className='book-type'>
            <label className='accessibility-label'>Accessibility</label>
            <select className='type' name='options'>
                <option value=''></option>
                {types.map((type, index) => (
                    <option key={index} value={type.toLowerCase().replace(/\s+/g, '-')}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Accessibility;