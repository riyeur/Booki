/**
 * This file defines the LlmPromptService class, which interacts with the Google Generative AI API to generate book recommendations.
 * The 'run' method constructs a prompt based on the user's form data and sends it to the AI model for content generation. It processes the response to parse book recommendations into JSON-like strings.
 * These parsed recommendations are then stored in the database using the storeResponse service.
 * The 'parseLLMResponse' method parses the raw response from the AI model, converting it into an array of JSON objects for further processing.
 * The class handles the communication with the generative AI model and database storage, ensuring the response is correctly formatted and stored.
 */


import { GoogleGenerativeAI } from "@google/generative-ai";

class LlmPromptService {

    constructor(apiKey, storeResponse) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({model: "gemini-2.0-flash"})
        this.storeResponse = storeResponse;
        this.run = this.run.bind(this);
    }
    
    async run(formData) {

        const prompt = `Recommend ${formData.numRecommendations} books based on this information:
        Genre: ${formData.genre}, Age Group:${formData.ageGroup}, Length: ${formData.length}, Author:${formData.author} , Language: ${formData.language}, 
        Accessibility: ${formData.accessibility}, Description: ${formData.description}, Similar Books: ${formData.similarBooks}. For each book, 
        provide the information as a string that can be converted to JSON format 
        (i.e. '{"Book":"name of the book", "Author":"name of author", "Accessibility":
        "information about if the book is available as a Physical book, E-book, Audiobook, 
        Braille, etc", "Description":"description of book(please do 2-5 lines for the description explaining what the book is about)"}'). 
        
        Only provide the strings, do not include anything else in your response. Each string should be separated 
        by a single semicolon, nothing else. Do not include any explanations, or additional text. Just return the string
        that appears to be formatted as JSON. To clarify, do not return an actual JSON array. ONLY return strings in the specified format.
            
        Remember, only return this format:

        {"Book":"name of the book", "Author":"name of author", "Accessibility":
        "information about if the book is available as a physical copy, digital, audiobook, 
        braille, etc", "Description": "description of book"};{"Book":"name of the book", "Author":"name of author", "Accessibility":
        "information about if the book is available as a physical copy, digital, audiobook, 
        braille, etc", "Description": "description of book"}
        
        DO NOT RETURN ANY ADDITIONAL TEXT BESIDES THIS NO MATTER WHAT.`;

        console.log("formData:", formData);
        console.log("Genre:", formData.genre);

        try {
            const result = await this.model.generateContent(prompt);
            const textResult = result.response.text(); 

            console.log("Raw LLM Response:", textResult);

            const parsedBooks = this.parseLLMResponse(textResult);
            
            const bookIDs = await this.storeResponse.storeBooksInDatabase(parsedBooks);
            console.log("Inserted Book IDs:", bookIDs);
            
            return bookIDs;

        } catch (error) {
            console.error("Error generating response:", error);
            return [];
        }
    }

    parseLLMResponse(response) {
        const arrayOfStrings = response.split(';')
            .map(item => item.trim())
            .filter(item => item !== '')
            .map(item => item.replace(/^'|'$/g, ''));

        return arrayOfStrings.map(item => JSON.parse(item));
    }

}

export default LlmPromptService;
