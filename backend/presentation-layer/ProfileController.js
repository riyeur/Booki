import ProfileService from '../business-layer/services/ProfileService.js';

// This class handles HTTP requests and responses
class ProfileController {

    constructor(profileService) {
        this.profileService = profileService;
        this.getUserBookmarks = this.getUserBookmarks.bind(this);
    }

    async getUserBookmarks(request, response) {
        try {
            // Extracting the token from the request
            const authorization_header = request.headers.authorization;
            const token = authorization_header && authorization_header.split(' ')[1]; // expecting to receive "Bearer <token>"

            // Call the business layer (ProfileService)
            const bookmarks = await this.profileService.getUserBookmarksById(token);
            
            if (!bookmarks) {
                // User doesn't have any bookmarks saved yet
                response.status(200);
                return response.json({ message: `No Bookmarks Found` })
            }

            // OK
            response.status(200);
            return response.json({ message: `Success`, bookmarks });

        } catch (error) {
            response.status(500);
            return response.json({ message: `Internal Server Error While Fetching Bookmarks` });
        }
    }
        
}

export default new ProfileController(ProfileService);