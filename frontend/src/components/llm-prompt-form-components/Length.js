import React from 'react';

const Length = () => {

    const length = [
        "Novella", "Full-length",
        "Short Story", "Adult"
    ];

    return (
        <div className='length'>
            <label>Length</label>
            <select className='lengths' name='options'>
                <option value='' disabled selected></option>
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