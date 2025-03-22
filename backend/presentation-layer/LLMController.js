/**
 * Controller class responsible for handling HTTP requests for LLM book generation.
 */

class LLMController {


    /**
     * Constructs an instance of LLMController.
     * @param {LlmPromptService} LlmPromptService - An instance of LlmPromptService for generating book recommendations.
     */

    constructor(LlmPromptService) {
        this.llmPromptService = LlmPromptService;
        this.generateBooks = this.generateBooks.bind(this);
    }

    /**
     * Handles the HTTP request to generate book recommendations.
     * Extracts form data from the request body, uses the LlmPromptService to generate book suggestions,
     * and returns the result as a JSON response.
     *
     * @param {Object} request - Request object containing the form data in `request.body`.
     * @param {Object} response - Response object used to send the results or error messages.
     * @returns {Promise<void>}
     */

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