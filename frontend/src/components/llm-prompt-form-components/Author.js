import React from 'react';

const Author = () => {
    return (
        <div className='author'>
            <label>Author</label>
            <div className='author-name'>
                <input type='text' placeholder='Optional' className='author-input'></input>
            </div>
        </div>
    );
}

export default Author;