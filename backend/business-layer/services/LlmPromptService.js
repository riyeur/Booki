
import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function run(formData){

    

    const genAI = new GoogleGenerativeAI("AIzaSyA-Qr62dRO5Gv_BhTQHJfgC1_D37FzArdE");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

     // prompt returns JSON-formatted strings that can be easily parsed
    const prompt = `Recommend ${formData.numRecommendations} books based on this information:
    Genre: ${formData.genre}, Age Group:${formData.ageGroup}, Length: ${formData.length}, Author:${formData.author} , Language: ${formData.language}, 
    Accessibility: ${formData.accessibility}, Description: ${formData.description}, Similar Books: ${formData.similarBooks}. For each book, 
    provide the information as a string that can be converted to JSON format 
    (i.e. '{"Book":"name of the book", "Author":"name of author", "Accessibility":
    "information about if the book is available as a physical copy, digital, audiobook, 
    braille, etc", "Description": "description of book"}'). 
    
    Only provide the JSON-formatted 
    string, do not include anything else in your response. Each string should be separated 
    by a single semicolon, nothing else. Do not include any explanations, or additional text.`;

    console.log("formData:", formData);
    console.log("Genre:", formData.genre);


    try{
    //retrieve result
    const result = await model.generateContent(prompt);
    const textResult = await result.response.text(); //retrieve result as text

    //debug
    console.log("Raw LLM Response:", textResult);

    //parse result into a JSON object and return
    return (parseLLMResponse(textResult));
    }catch(error){
        console.error("Error generating response!:", error);
        return [];
    }

}

//parse LLM response into a JSON array
function parseLLMResponse(response) {
    // will result in an array of JSON-formatted strings
    const arrayOfStrings = response.split(';')
    .map(item => item.trim()) //remove whitespace and newlines
    .filter(item => item !== '') //remove empty strings if any
    .map(item => item.replace(/^'|'$/g, '')); //remove surrounding single quotes

    //parse the strings into JSON objects
    const jsonArray = arrayOfStrings.map(item => JSON.parse(item))

    return jsonArray;
}


// run();