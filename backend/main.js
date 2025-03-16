const { GoogleGenerativeAI } = require("@google/generative-ai");4

async function run(){

const genAI = new GoogleGenerativeAI("AIzaSyA-Qr62dRO5Gv_BhTQHJfgC1_D37FzArdE");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//prompt input
const prompt = "Give {# of book recommendations} using the following specifications: {genre},{age group},{length},{author},{language},{accessibility},{descr},{similar books}";

//retrieve result
const result = await model.generateContent(prompt);

//print converted result to text
console.log(result.response.text());
}

run();