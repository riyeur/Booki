import ProfileService from '../business-layer/services/ProfileService.js';

// This class handles HTTP requests and responses
class ProfileController {

    constructor(profileService) {
        this.profileService = profileService;
        this.extractToken = this.extractToken.bind(this);
        this.getUserBookmarks = this.getUserBookmarks.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.deleteBookmark = this.deleteBookmark.bind(this);
    }

    extractToken(request){
        // Extracting the token from the request
        const authorization_header = request.headers.authorization;
        const token = authorization_header && authorization_header.split(' ')[1]; // expecting to receive "Bearer <token>"
        return token;
    }

    async getUserBookmarks(request, response) {
        try {
            const token = this.extractToken(request);

            // Call the business layer (ProfileService)
            const bookmarks = await this.profileService.getUserBookmarksById(token);
            
            if (!bookmarks) {
                // User doesn't have any bookmarks saved yet
                return response.status(200).json({});
            }

            // OK
            return response.status(200).json({ bookmarks });

        } catch (error) {
            // Internal Server Error
            return response.status(500).json({});
        }
    }

    async getUsername(request, response) {
        try {
            const token = this.extractToken(request);

            // Call the business layer (ProfileService)
            const username = await this.profileService.getUsernameById(token);
            
            if (!username) {
                // Unauthorized
                return response.status(401).json({});
            }

            // OK
            return response.status(200).json({ username });

        } catch (error) {
            // Internal Server Error
            return response.status(500).json({});
        }
    }

    async deleteBookmark(request, response) {
        const bookmarkId = request.params.bookmarkId;
        try {
            // Call the business layer (ProfileService)
            const success = await this.profileService.deleteBookmarkById(bookmarkId);
            
            if (!success) {
                // Bookmark not found
                return response.status(404).json({});
            }

            // OK
            return response.status(200).json({});

        } catch (error) {
            // Internal Server Error
            return response.status(500).json({});
        }
    }
        
}

export default new ProfileController(ProfileService);