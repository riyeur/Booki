import Bookmarks from '../../persistence-layer/database-functions/Bookmarks.js';
import Users from '../../persistence-layer/database-functions/Users.js';
import jwt from 'jsonwebtoken';

class ProfileService {
    constructor(bookmarks, users) {
        this.bookmarks = bookmarks;
        this.users = users;
        this.extractUserId = this.extractUserId.bind(this);
        this.getUserBookmarksById = this.getUserBookmarksById.bind(this);
        this.getUsernameById = this.getUsernameById.bind(this);
        this.deleteBookmarkById = this.deleteBookmarkById.bind(this);
    }

    extractUserId(token){
        // decode the token and extract the user id from it
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded_token.userID;
        return userId;
    }

    async getUserBookmarksById(token) {
        try{
            const userId = this.extractUserId(token);

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

    async getUsernameById(token) {
        try{
            const userId = this.extractUserId(token);

            // check that the current user is authorized/ has an Id
            if(!userId){
                return null;
            }
            // get the user's username using the sql querry in the persistence layer
            const username = await this.users.getUsernameByUserId(userId);
            return username;
        }
        catch (error){
            return null;
        }
    }

    async deleteBookmarkById(bookmarkId) {
        try{
            // delete the requested bookmark using the sql querry in the persistence layer
            const success = await this.bookmarks.deleteBookmarkByBookId(bookmarkId);
            return success;
        }
        catch (error){
            return false;
        }
    }
}

export default new ProfileService(Bookmarks, Users);