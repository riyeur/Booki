/**
 * Controller class responsible for handling results operations.
 * for example: retrieving generated books and creating user bookmarks.
 */

class ResultController {


    /**
     * Constructs an instance of ResultController.
     * @param {Object} resultService - Instance of ResultService, responsible for logic related to results (fetching and saving books).
     */
    
    constructor(resultService) {
        this.resultService = resultService;
        this.getGeneratedBooks = this.getGeneratedBooks.bind(this);
        this.createBookmark = this.createBookmark.bind(this);
    }

     /**
     * Handles the HTTP request to retrieve books by their IDs.
     * Calls the result service to fetch book data using the provided book IDs from the request body.
     *
     * @param {Object} request - request object containing `bookIDs` in the body.
     * @param {Object} response - response object used to return the book data or an error.
     * @returns {Promise<void>}
     */

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

    /**
     * Handles the HTTP request to bookmark a book for the authenticated user.
     * Extracts the authorization token from the request header and the book ID from the route parameters,
     * then passes them to the result service for saving.
     *
     * @param {Object} request - request object containing authorization header and route param `bookId`.
     * @param {Object} response - response object used to confirm success or return an error.
     * @returns {Promise<void>}
     */

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