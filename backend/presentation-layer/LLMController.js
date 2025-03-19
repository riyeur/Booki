import LlmPromptService from '../business-layer/services/LlmPromptService.js'

class LLMController {

    constructor(LlmPromptService){
        this.llmPromptService = LlmPromptService;
        this.generateBooks = this.generateBooks.bind(this);

    }

    async generateBooks(request,response){
        try{
            const formData = request.body; //get request from frontend
            const results = await this.llmPromptService.run(formData); //call LLM function
            response.status(200).json(results); // send response to frontend
        } catch(error){
            console.error("Error when generating books!:", error);
            response.status(500).json({message: "Internal Service Error"});
        }
    }
}

export default new LLMController(new LlmPromptService("AIzaSyA-Qr62dRO5Gv_BhTQHJfgC1_D37FzArdE"));