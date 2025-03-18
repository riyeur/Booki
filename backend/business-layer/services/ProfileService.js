import Bookmarks from '../../persistence-layer/database-functions/Bookmarks.js';

class ProfileService {
    constructor(bookmarks) {
        this.bookmarks = bookmarks;
        this.getUserBookmarksById = this.getUserBookmarksById.bind(this);
    }

    async getUserBookmarksById(userId) {
        // check that the current user is authorized/ has an Id
        if(userId == null){
            return false;
        }

        try{
            // get the user's bookmarks using the sql querry in the persistence layer
            const userBookmarks = await this.bookmarks.getBooksByUserId(userId);
            return userBookmarks;
        }
        catch (error){
            console.log("error in profile service.js:", error);
            return null;
        }

    }
}

export default new ProfileService(Bookmarks);