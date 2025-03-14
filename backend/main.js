const { GoogleGenerativeAI } = require("@google/generative-ai");4

async function run(){

const genAI = new GoogleGenerativeAI("AIzaSyA-Qr62dRO5Gv_BhTQHJfgC1_D37FzArdE");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//prompt input
const prompt = "Explain how AI works";

//retrieve result
const result = await model.generateContent(prompt);

//print converted result to text
console.log(result.response.text());
}

run();