import React from 'react';

const AgeGroup = () => {
    
    const groups = [
        "Kids", "Teens",
        "Young Adult", "Adult"
    ];

    return (
        <div className='age-group'>
            <label>Age Group</label>
            <select className='group' name='options'>
                <option value='' disabled selected></option>
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