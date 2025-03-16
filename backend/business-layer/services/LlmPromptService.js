
import { GoogleGenerativeAI } from "@google/generative-ai";

async function run(){

const genAI = new GoogleGenerativeAI("AIzaSyA-Qr62dRO5Gv_BhTQHJfgC1_D37FzArdE");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//prompt input
const prompt = `Recommend <> books based on this information: 
Genre: Mystery, Age Group: 16-25, Length: 300+, Author: , Language: English, Accessibility: <n/a>, 
Description: <n/a>, Similar Books: <n/a>. 
For each book, provide the information in the following format. 
Book Name: <name of the book> Author: <name of author> 
Accessibility: <information about if the book is available as a physical copy, digital, audiobook, braille, etc> 
Description: <description of book>`;

//retrieve result
const result = await model.generateContent(prompt);

//print result as text (debugging purposes only)
console.log(result.response.text());
}

run();