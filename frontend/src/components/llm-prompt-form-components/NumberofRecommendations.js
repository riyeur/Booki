import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const NumberOfRecommendations = ({name, value, onChange}) => {

    const recommendations = [
        "1", "2 - 4", "5+"
    ];

    return (
        <div className='number-of-recommendations'>
            <label className='recommendations-label'>Number of Recommendations</label>
            <select className='recommendations' name={name} value={value} onChange={onChange}>
                <option value='' disabled selected></option>
                {recommendations.map((recommendations, index) => (
                    <option key={index} value={recommendations.toLowerCase().replace(/\s+/g, '-')}>
                        {recommendations}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default NumberOfRecommendations;