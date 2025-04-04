import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const AgeGroup = ({name, value, onChange}) => {
    
    const groups = [
        "Kids", "Teens",
        "Young Adult", "Adult"
    ];

    return (
        <div className='age-group'>
            <label className='age-group-label'>Age Group</label>
            <select className='group' name={name} value={value} onChange={onChange}>
                <option value=''></option>
                {groups.map((group, index) => (
                    <option key={index} value={group.toLowerCase().replace(/\s+/g, '-')}>
                        {group}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default AgeGroup;