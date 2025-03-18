import ProfileService from '../business-layer/services/ProfileService.js';

// This class handles HTTP requests and responses
class ProfileController {

    constructor(profileService) {
        this.profileService = profileService;
        this.getUserBookmarks = this.getUserBookmarks.bind(this);
    }

    async getUserBookmarks(request, response) {
        try {
            // Call the business layer (ProfileService)
            console.log("request: ", request);
            const bookmarks = await this.profileService.getUserBookmarksById(request.body.token);
            
            if (!bookmarks) {
                // Unauthorized
                response.status(401)
                return response.json({ message: `Not Authorized to Access Profile1` })
            }

            // OK
            response.status(200)
            return response.json({ message: `Authorized`, bookmarks });

        } catch (error) {
            console.log("error in the profile controller:", error);
            response.status(401);
            return response.json({ message: `Not Authorized to Access Profile2` });
        }
    }
        
}

export default new ProfileController(ProfileService);