import ResultService from '../business-layer/services/ResultService.js';

class ResultController {

    constructor(resultService) {
        this.resultService = resultService;
        this.getGeneratedBooks = this.getGeneratedBooks.bind(this);
    }

    async getGeneratedBooks(request, response) {
        try {
            console.log(`(ResultController) Calling ResultService to get the generated books`);

            const books = await this.resultService.getBooks(request.body.bookIDs);

            if (!books.length) {
                return response.status(401).json({});
            }

            console.log(`(ResultController) Returned from ResultService with the books`);

            return response.status(200).json({ books });

        } catch (error) {
            return response.status(401).json({});
        }
    }
}

export default new ResultController(ResultService);