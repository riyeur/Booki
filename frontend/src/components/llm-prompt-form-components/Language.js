import React from 'react';

const Language = () => {
    
    const languages = [
        "English", "French", "Spanish", "Mandarin", "Hindi", "Urdu"
    ];

    return (
        <div className='languages'>
            <label>Language</label>
            <select className='language' name='options' defaultValue="English">
                <option value=''></option>
                {languages.map((language, index) => (
                    <option key={index} value={language.toLowerCase().replace(/\s+/g, '-')}>
                        {language}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Language;