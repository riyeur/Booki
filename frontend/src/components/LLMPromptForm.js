import React, {useState} from 'react';
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
    const [formData, formInfo] = useState ({
        genre: "",
        ageGroup: "",
        length : "",
        author: "",
        language: "",
        accessibility: "",
        description: "",
        similarBooks: "",
        numReccomendations: "",

    });


    //submit action

    const handleSubmit = async (e) => {

       
        


    };
     

    return (
        <div className='llm-prompt-form'>
            <div className='question'>
                <h4 className='what-kind-of-book'>What kind of book would you like to read?</h4>
                <hr className='boundary'/>
            </div>
            <div className='llm-prompt-form-inputs'>
                <form className='form-inputs'>
                    <div className='first-row'>
                        <Genre></Genre>
                        <NumberOfRecommendations></NumberOfRecommendations>
                    </div>
                    <div className='second-row'>
                        <AgeGroup></AgeGroup>
                        <Length></Length>
                    </div>
                    <div className='third-row'>
                        <Author></Author>
                    </div>
                    <div className='fourth-row'>
                        <Language></Language>
                        <Accessibility></Accessibility>
                    </div>
                    <div className='fifth-row'>
                        <Description></Description>
                    </div>
                    <div className='sixth-row'>
                        <SimilarBooks></SimilarBooks>
                    </div>
                    <div className='seventh-row'>
                        <input type='submit' value='Submit' className='submit-button'></input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LLMPromptForm;