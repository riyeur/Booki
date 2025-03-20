//express route to handle requests

import express from "express";
import LLMController from "../presentation-layer/LLMController.js";

const router = express.Router();

//define post route for generating book recs
router.post("/generate-books", LLMController.generateBooks);


export default router;
