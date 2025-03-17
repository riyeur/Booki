import React, {useState} from 'react';
import { getBookRecs } from '../services/LlmService.js'
import Genre from '../components/llm-prompt-form-components/Genre';
import AgeGroup from '../components/llm-prompt-form-components/AgeGroup';
import Length from '../components/llm-prompt-form-components/Length';
import Author from '../components/llm-prompt-form-components/Author';
import Language from '../components/llm-prompt-form-components/Language';
import Accessibility from '../components/llm-prompt-form-components/Accessibility';
import Description from '../components/llm-prompt-form-components/Description';
import SimilarBooks from '../components/llm-prompt-form-components/SimilarBooks';
import NumberOfRecommendations from '../components/llm-prompt-form-components/NumberofRecommendations';
import '../styles/LLMPromptPageStyles.css'

const LLMPromptForm = () => {

     // add usestate to track user data from prompt form
     const [formData, setFormData] = useState ({
        genre: "",
        ageGroup: "",
        length : "",
        author: "",
        language: "",
        accessibility: "",
        description: "",
        similarBooks: "",
        numRecommendations: "",

    });

    //track AI response (mainly for UI) ** NOT IMPLEMENTED YET
    const [loading, setLoading] = useState(false);
    const [recs, setRecs] = useState([]);

    //handle input changes
    const handleChange = (e) =>{
        
        const{name, value} = e.target;
        console.error(`DEBUG DEBUG DEBUG updating ${name} to ${value}`);//debug

        setFormData((prevData) => ({
            ...prevData,
            [name]: value // changes the specific element that was changed by the user
        }));
        
    };


    //submit button action
    const handleSubmit = async (e) => {

        e.preventDefault(); // prevent page loading/resetting

        console.log("final formData:", formData);
        setLoading(true);
        setRecs([]);

        try{
            console.log("Sending request with formData:", formData);
            const results = await getBookRecs(formData);
            console.log("LLM response:", results);
        } catch(error){
            console.log("Error retrieving data :/, error:", error);
        }

        setLoading(false);

        console.log(loading);

    };

    return (

        
        <div className='llm-prompt-form'>
            <div className='question'>
                <h4 className='what-kind-of-book'>What kind of book would you like to read?</h4>
                <hr className='boundary'/>
            </div>
            <div className='llm-prompt-form-inputs'>
                <form className='form-inputs' onSubmit ={handleSubmit}>
                    <div className='first-row'>
                        <Genre name="genre" onChange={handleChange}></Genre>
                        <NumberOfRecommendations name="numRecommendations" onChange={handleChange} ></NumberOfRecommendations>
                    </div>
                    <div className='second-row'>
                        <AgeGroup name="ageGroup" onChange={handleChange}></AgeGroup>
                        <Length name="length" onChange={handleChange}></Length>
                    </div>
                    <div className='third-row'>
                        <Author name="author" onChange={handleChange}></Author>
                    </div>
                    <div className='fourth-row'>
                        <Language name="language" onChange={handleChange}></Language>
                        <Accessibility name="accessibility" onChange={handleChange}></Accessibility>
                    </div>
                    <div className='fifth-row'>
                        <Description name="description" onChange={handleChange}></Description>
                    </div>
                    <div className='sixth-row'>
                        <SimilarBooks name="similarBooks" onChange={handleChange}></SimilarBooks>
                    </div>
                    <div className='seventh-row'>
                        <input type='submit' value='Submit' className='submit-button'></input>
                    </div>
                </form>
            </div>

            {loading && <p className="loading">Generating recommendations...</p>}

            {/* Display Recommendations */}
            {recs.length > 0 && (
                <div className='recommendations'>
                    <h3>Book Recommendations:</h3>
                    <ul>
                        {recs.map((book, index) => (
                            <li key={index} className="book-item">
                                <strong>{book.Book}</strong> by {book.Author}
                                <p><strong>Accessibility:</strong> {book.Accessibility}</p>
                                <p><strong>Description:</strong> {book.Description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default LLMPromptForm;