import Bookmarks from '../../persistence-layer/database-functions/Bookmarks.js';
import jwt from 'jsonwebtoken';

class ProfileService {
    constructor(bookmarks) {
        this.bookmarks = bookmarks;
        this.getUserBookmarksById = this.getUserBookmarksById.bind(this);
    }

    async getUserBookmarksById(token) {
        try{
            // decode the token and extract the user id from it
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded_token.userID;

            // check that the current user is authorized/ has an Id
            if(!userId){
                return null;
            }
            // get the user's bookmarks using the sql querry in the persistence layer
            const userBookmarks = await this.bookmarks.getBooksByUserId(userId);
            return userBookmarks;
        }
        catch (error){
            return null;
        }

    }
}

export default new ProfileService(Bookmarks);