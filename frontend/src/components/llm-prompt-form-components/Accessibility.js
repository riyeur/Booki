import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Accessibility = ({name, value, onChange}) => {
    
    const types = [
        "Physical Book", "E-book", "Audiobook"
    ];

    return (
        <div className='book-type'>
            <label className='accessibility-label'>Accessibility</label>
            <select className='type' name={name} value={value} onChange={onChange}>
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