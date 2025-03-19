
import { GoogleGenerativeAI } from "@google/generative-ai";
import StoreLLMResponse from "../../persistence-layer/database-functions/StoreLLMResponse.js";

export default async function run(formData){
    const genAI = new GoogleGenerativeAI("AIzaSyA-Qr62dRO5Gv_BhTQHJfgC1_D37FzArdE"); 
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Recommend ${formData.numRecommendations} books based on this information:
    Genre: ${formData.genre}, Age Group:${formData.ageGroup}, Length: ${formData.length}, Author:${formData.author} , Language: ${formData.language}, 
    Accessibility: ${formData.accessibility}, Description: ${formData.description}, Similar Books: ${formData.similarBooks}. For each book, 
    provide the information as a string that can be converted to JSON format 
    (i.e. '{"Book":"name of the book", "Author":"name of author", "Accessibility":
    "information about if the book is available as a physical copy, digital, audiobook, 
    braille, etc", "Description": "description of book"}'). 
    
    Only provide the JSON-formatted 
    string, do not include anything else in your response. Each string should be separated 
    by a single semicolon, nothing else. Do not include any explanations, or additional text. Just return the string
    that appears to be formatted as JSON. To clarify, do not return an actual JSON array. ONLY return strings in the specified format.`;

    console.log("formData:", formData);
    console.log("Genre:", formData.genre);

    try {
        const result = await model.generateContent(prompt);
        const textResult = await result.response.text(); 

        console.log("Raw LLM Response:", textResult);

        const parsedBooks = parseLLMResponse(textResult);
        
        // Store the parsed books in the database
        await StoreLLMResponse.storeBooksInDatabase(parsedBooks);


        // FOR DEBUGGING ONLY
        // Retrieve the stored books from database; test to check StoreLLMResponse.js
        const storedBooks = await StoreLLMResponse.getStoredBooks();
        console.log("Stored Books in Database:", storedBooks);

        return parsedBooks;
    } catch (error) {
        console.error("Error generating response!:", error);
        return [];
    }
}

// Parse LLM response into a JSON array
function parseLLMResponse(response) {
    const arrayOfStrings = response.split(';')
        .map(item => item.trim())
        .filter(item => item !== '')
        .map(item => item.replace(/^'|'$/g, ''));

    return arrayOfStrings.map(item => JSON.parse(item));
}
