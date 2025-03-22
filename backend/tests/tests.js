import assert from 'assert';
import jwt from 'jsonwebtoken';
import LoginService from '../business-layer/services/LoginService.js';
import SignupService from '../business-layer/services/SignupService.js';
import ResultService from '../business-layer/services/ResultService.js';
import ProfileService from '../business-layer/services/ProfileService.js';

/* --------- LOGIN TESTS --------- */

/* THIS IS TO MOCK getUserByUsername AND getJWT FOR LOGINSERVICE */

const mockUserLoginDatabase = {
    getUserByUsername: async(username) => {
        if (username === 'riyeur') {
            return {User_ID: 1, Username: 'riyeur', User_Password: 'strongpassword'};
        }
        return null;
    }
};

const mockToken = {
    getJWT: (data) => 'mock-token-for-riyeur'
};

const loginService = new LoginService(mockUserLoginDatabase, mockToken);

/* Test 01: Valid user login (user exists and their credentials are correct) */
(async () => {
    const token = await loginService.authenticateUser('riyeur', 'strongpassword');
    assert.strictEqual(token, 'mock-token-for-riyeur');
    console.log('Valid login [TEST PASSED]');
})();

/* Test 02: Invalid user login (Credentials are incorrect) */
(async () => {
    const token = await loginService.authenticateUser('riyeur', 'wrongpassword');
    assert.strictEqual(token, false);
    console.log('Invalid login [TEST PASSED]');
})();

/* --------- SIGNUP TESTS --------- */

/* THIS IS TO MOCK getUserByUsername AND createUser FOR SIGNUPSERVICE */

const mockUserSignUpDatabase = {
    getUserByUsername: async(username) => {
        if (username === 'riyeur') {
            return {User_ID: 1, Username: 'riyeur', User_Password: 'strongpassword'};
        }
        return null;
    },

    createUser: async(email, username, password) => {
        return 13;
    }
};

const signupService = new SignupService(mockUserSignUpDatabase);

/* Test 03: Valid user signup (all fields are valid and username is not already taken) */
(async () => {
    const signup = await signupService.registerUser('testing123@email.com', 'lalala123', 'securepassword');

    assert.deepStrictEqual(signup, {success: true, message: "Successful, redirecting to login"});
    console.log('Valid signup [TEST PASSED]');
})();

/* Test 04: Invalid user signup (all fields are valid but username is already taken) */
(async () => {
    const signup = await signupService.registerUser('testing123@email.com', 'riyeur', 'securepassword');

    assert.deepStrictEqual(signup, {success: false, message: "Username is already taken"});
    console.log('Invalid signup [TEST PASSED]');
})();

/* --------- GENERATED BOOK RETRIEVAL AND SAVING BOOKS (RESULTS) TESTS --------- */

/* THIS IS TO MOCK getBooksByBookId AND createBookmarkForUser FOR RESULTSERVICE */

const mockResults = {
    getBooksByBookId: async (ids) => {
        if (ids.includes(1)) {
            return [{ Book_ID: 1, Book: 'This is book 1' }];
        }
        return null;
    },

    createBookmarkForUser: async (bookId, userId) => {
        if (bookId === 1 && userId === 13) {
            return true;
        }
        
        return false;
    }
};

jwt.verify = () => {
    return { userID: 13 };
};

const resultService = new ResultService(mockResults);

/* Test 05: Retrieve generated books correctly */
(async () => {
    const books = await resultService.getBooks([1]);

    assert.deepStrictEqual(books, [{Book_ID: 1, Book: 'This is book 1'}]);
    console.log('Successfully retrieved generated books [TEST PASSED]');

})();

/* Test 06: Bookmark saved correctly if the user wants to save it (returns true) */
(async () => {
    const saved = await resultService.saveBookForUser('mock-token-for-riyeur', 1);

    assert.strictEqual(saved, true);
    console.log('Bookmark saved with valid token [TEST PASSED]');

})();

/* Test 07: Bookmark does not save if the user is not logged in (returns false) */
(async () => {
    jwt.verify = () => {
        throw new Error("Invalid token");
    };

    const saved = await resultService.saveBookForUser(null, 1);
    assert.strictEqual(saved, false);
    console.log('Bookmark does not save when the user is not logged in [TEST PASSED]');
})();

/* --------- BOOK DELETION FROM PROFILE (PROFILE) TESTS --------- */

const mockBookmarks = {
    deleteBookmarkByBookId: async (bookmarkId) => {
        if (bookmarkId === 13) {
            return true;
        }
        return false;
    }
};

const profileService = new ProfileService(mockBookmarks, null);

/* Test 08: Delete a valid bookmark (returns true) */
(async () => {
    const success = await profileService.deleteBookmarkById(13);

    assert.strictEqual(success, true);
    console.log('Bookmark deleted successfully [TEST PASSED]');
})();

/* Test 09: Delete a bookmark that doesn't exist (returns false) */
(async () => {
    const success = await profileService.deleteBookmarkById(19);

    assert.strictEqual(success, false);
    console.log('Bookmark not deleted because it does not exist [TEST PASSED]');
})();
