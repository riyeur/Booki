//express route to handle requests

import express from "express";
import run from "../business-layer/services/LlmPromptService.js";

const router = express.Router();

//define post route for generating book recs
router.post("/generate-books", async (req,res) =>{

    try{
        const formData = req.body; // get data from frontend request
        const results = await run(formData); //call LLM function
        res.json(results); // send response to frontend
    }catch(error){
        console.log("Error when generating books:",error);
    }

});


export default router;
