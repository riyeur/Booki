import React from 'react';

const Genre = () => {
    
    const genres = [
        "Action", "Biographical", "Chick Lit", "Classics",
        "Contemporary", "Fantasy", "Fiction", "Historical Fiction", "History",
        "Horror", "Humor and Comedy", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Psychology", "Romance", "Science", "Science Fiction",
        "Self Help", "Sports", "Thriller"
    ];

    return (
        <div className='genres'>
            <select className='genre' name='options'>
                <option value="" disabled selected>Genre</option>
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