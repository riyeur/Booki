class ResultController {

    constructor(resultService) {
        this.resultService = resultService;
        this.getGeneratedBooks = this.getGeneratedBooks.bind(this);
        this.createBookmark = this.createBookmark.bind(this);
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

    async createBookmark(request, response) {
        try {
            const authorizationHeader = request.headers.authorization;
            const token = authorizationHeader && authorizationHeader.split(' ')[1];

            const bookID = request.params.bookId;

            console.log(`Sending book to service with boodID ${bookID}.`);
            const saveSuccessful = await this.resultService.saveBookForUser(token, bookID);

            if (!saveSuccessful) {
                return response.status(401).json({});
            }

            return response.status(200).json({});

        } catch (error) {
            return response.status(401).json({});
        }
    }
}

export default ResultController;