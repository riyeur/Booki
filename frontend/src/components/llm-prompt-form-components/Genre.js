import React from 'react';
import '../../styles/LLMPromptPageStyles.css'

const Genre = ({name, value, onChange}) => {
    
    const genres = [
        "Action", "Biographical", "Chick Lit", "Classics",
        "Contemporary", "Fantasy", "Fiction", "Historical Fiction", "History",
        "Horror", "Humor and Comedy", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Psychology", "Romance", "Science", "Science Fiction",
        "Self Help", "Sports", "Thriller"
    ];

    return (
        <div className='genres'>
            <label className='genre-label'>Genre</label>
            <select className='genre' name={name} value={value} onChange={onChange}>
                <option value='' disabled selected></option>
                {genres.map((genre, index) => (
                    <option key={index} value={genre.toLowerCase().replace(/\s+/g, '-')}>
                        {genre}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Genre;