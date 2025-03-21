class LLMController {

    constructor(LlmPromptService) {
        this.llmPromptService = LlmPromptService;
        this.generateBooks = this.generateBooks.bind(this);
    }

    async generateBooks(request, response) {
        try {
            const formData = request.body;

            const results = await this.llmPromptService.run(formData);
            
            response.status(200).json(results);
        } catch(error){
            console.error("Error when generating books:", error);
            response.status(500).json({message: "Internal error"});
        }
    }
}

export default LLMController;