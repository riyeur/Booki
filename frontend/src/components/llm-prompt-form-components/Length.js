import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Length = ({name,value,onChange}) => {

    const length = [
        "Novella", "Full-length",
        "Short Story"
    ];

    return (
        <div className='length'>
            <label className='label-length'>Length</label>
            <select className='lengths' name={name} value={value} onChange={onChange}>
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