import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Length = () => {

    const length = [
        "Novella", "Full-length",
        "Short Story", "Adult"
    ];

    return (
        <div className='length'>
            <label className='label-length'>Length</label>
            <select className='lengths' name='options'>
                <option value=''></option>
                {length.map((length, index) => (
                    <option key={index} value={length.toLowerCase().replace(/\s+/g, '-')}>
                        {length}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Length;