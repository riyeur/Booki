// llmtests.js
import LlmPromptService from './llmpromptservice';
import { GoogleGenerativeAI } from "@google/generative-ai";
import connection from './connection.js';

// Mock the GoogleGenerativeAI and related dependencies
jest.mock('@google/generative-ai');
jest.mock('./connection.js');

// PART 1: LLM PROMPT GENERATION TESTS (UT-16 to UT-18)
describe('LLM Prompt Generation Tests', () => {
  let llmPromptService;
  let mockStoreResponse;
  let mockModel;
  let mockGenerateContent;
  let mockLLMController;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Create mocks for LlmPromptService
    mockGenerateContent = jest.fn();
    mockModel = {
      generateContent: mockGenerateContent
    };
    
    // Mock the GoogleGenerativeAI implementation
    GoogleGenerativeAI.mockImplementation(() => ({
      getGenerativeModel: () => mockModel
    }));
    
    // Mock storeResponse
    mockStoreResponse = {
      storeBooksInDatabase: jest.fn().mockResolvedValue([1, 2, 3])
    };
    
    // Create the service with mocks
    llmPromptService = new LlmPromptService('fake-api-key', mockStoreResponse);
    
    // Mock LLMController
    mockLLMController = {
      generateBooks: jest.fn()
    };
    
    // Mock request and response for controller tests
    mockRequest = {
      body: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    // Create real controller with mocked service for testing
    class LLMController {
      constructor(LlmPromptService) {
        this.llmPromptService = LlmPromptService;
        this.generateBooks = this.generateBooks.bind(this);
      }
      
      async generateBooks(request, response) {
        try {
          const formData = request.body;
          const results = await this.llmPromptService.run(formData);
          response.status(200).json(results);
        } catch(error) {
          console.error("Error when generating books:", error);
          response.status(500).json({message: "Internal error"});
        }
      }
    }
    
    mockLLMController = new LLMController(llmPromptService);
  });

  // UT-16: User enters all fields of the prompt and submits
  test('UT-16: Successfully processes form with all fields filled', async () => {
    // Arrange
    const completeFormData = {
      numRecommendations: 3,
      genre: 'Fantasy',
      ageGroup: 'Young Adult',
      length: 'Medium',
      author: 'J.K. Rowling',
      language: 'English',
      accessibility: 'All formats',
      description: 'Magic school adventures',
      similarBooks: 'Percy Jackson'
    };
    
    const mockResponse = {
      response: {
        text: () => '{"Book":"Harry Potter", "Author":"J.K. Rowling", "Accessibility":"Physical, E-book, Audiobook", "Description":"Wizard school adventures"};{"Book":"Percy Jackson", "Author":"Rick Riordan", "Accessibility":"Physical, E-book", "Description":"Greek mythology adventures"}'
      }
    };
    
    mockGenerateContent.mockResolvedValue(mockResponse);
    
    // Act
    const result = await llmPromptService.run(completeFormData);
    
    // Assert
    expect(mockGenerateContent).toHaveBeenCalled();
    expect(mockStoreResponse.storeBooksInDatabase).toHaveBeenCalled();
    expect(result).toEqual([1, 2, 3]);
    
    // Verify prompt construction
    const promptArg = mockGenerateContent.mock.calls[0][0];
    expect(promptArg).toContain(`Genre: ${completeFormData.genre}`);
    expect(promptArg).toContain(`Age Group:${completeFormData.ageGroup}`);
    expect(promptArg).toContain(`Length: ${completeFormData.length}`);
    expect(promptArg).toContain(`Author:${completeFormData.author}`);
  });

  // UT-16: Controller test
  test('UT-16: Controller successfully processes complete form data', async () => {
    // Arrange
    mockRequest.body = {
      numRecommendations: 3,
      genre: 'Fantasy',
      ageGroup: 'Young Adult',
      length: 'Medium',
      author: 'J.K. Rowling',
      language: 'English',
      accessibility: 'All formats',
      description: 'Magic school adventures',
      similarBooks: 'Percy Jackson'
    };
    
    const mockLLMResponse = {
      response: {
        text: () => '{"Book":"Harry Potter", "Author":"J.K. Rowling", "Accessibility":"Physical, E-book, Audiobook", "Description":"Wizard school adventures"}'
      }
    };
    
    mockGenerateContent.mockResolvedValue(mockLLMResponse);
    
    // Act
    await mockLLMController.generateBooks(mockRequest, mockResponse);
    
    // Assert
    expect(mockGenerateContent).toHaveBeenCalled();
    expect(mockStoreResponse.storeBooksInDatabase).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([1, 2, 3]);
  });

  // UT-17: User leaves some of the mandatory fields empty
  test('UT-17: Handles form with missing mandatory fields', async () => {
    // Arrange
    const incompleteFormData = {
      numRecommendations: 3,
      genre: '', // Empty mandatory field
      ageGroup: 'Young Adult',
      length: '',  // Empty mandatory field
      author: '',  // Empty mandatory field
      language: 'English',
      accessibility: 'All formats',
      description: 'Magic school adventures',
      similarBooks: 'Percy Jackson'
    };
    
    const mockLLMResponse = {
      response: {
        text: () => '{"Book":"Generic Fantasy Book", "Author":"Various Authors", "Accessibility":"Physical, E-book", "Description":"Generic fantasy description"}'
      }
    };
    
    mockGenerateContent.mockResolvedValue(mockLLMResponse);
    
    // Act
    const result = await llmPromptService.run(incompleteFormData);
    
    // Assert
    expect(mockGenerateContent).toHaveBeenCalled();
    
    // Check that empty fields are properly handled in the prompt
    const promptArg = mockGenerateContent.mock.calls[0][0];
    expect(promptArg).toContain('Genre: ');
    expect(promptArg).toContain('Author:');
    
    // Verify results
    expect(mockStoreResponse.storeBooksInDatabase).toHaveBeenCalled();
    expect(result).toEqual([1, 2, 3]);
  });

  // UT-17: Controller test with incomplete data
  test('UT-17: Controller handles incomplete form data', async () => {
    // Arrange
    mockRequest.body = {
      numRecommendations: 3,
      genre: '', // Empty field
      ageGroup: 'Young Adult',
      length: '', // Empty field
      author: '', // Empty field
      language: 'English',
      accessibility: 'All formats',
      description: 'Magic school adventures',
      similarBooks: 'Percy Jackson'
    };
    
    const mockLLMResponse = {
      response: {
        text: () => '{"Book":"Generic Book", "Author":"Various Authors", "Accessibility":"Physical", "Description":"Generic description"}'
      }
    };
    
    mockGenerateContent.mockResolvedValue(mockLLMResponse);
    
    // Act
    await mockLLMController.generateBooks(mockRequest, mockResponse);
    
    // Assert
    expect(mockGenerateContent).toHaveBeenCalled();
    expect(mockStoreResponse.storeBooksInDatabase).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([1, 2, 3]);
  });

  // UT-18: User spams the submit button
  test('UT-18: Handles rapid consecutive submissions', async () => {
    // Arrange
    const formData = {
      numRecommendations: 3,
      genre: 'Fantasy',
      ageGroup: 'Young Adult',
      length: 'Medium',
      author: 'J.K. Rowling',
      language: 'English',
      accessibility: 'All formats',
      description: 'Magic school adventures',
      similarBooks: 'Percy Jackson'
    };
    
    const mockLLMResponse = {
      response: {
        text: () => '{"Book":"Harry Potter", "Author":"J.K. Rowling", "Accessibility":"Physical, E-book, Audiobook", "Description":"Wizard school adventures"}'
      }
    };
    
    // Simulate delayed responses to test concurrent calls
    mockGenerateContent.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockLLMResponse), 100);
      });
    });
    
    // Act - simulate multiple rapid submissions
    const promises = [
      llmPromptService.run(formData),
      llmPromptService.run(formData),
      llmPromptService.run(formData)
    ];
    
    // Assert
    const results = await Promise.all(promises);
    
    // All calls should complete successfully
    expect(mockGenerateContent).toHaveBeenCalledTimes(3);
    expect(mockStoreResponse.storeBooksInDatabase).toHaveBeenCalledTimes(3);
    
    // Each call should return results
    results.forEach(result => {
      expect(result).toEqual([1, 2, 3]);
    });
  });

});

// PART 2: BOOKMARK FEATURE TESTS (UT-19 to UT-20)
describe('Bookmark Feature Tests', () => {
  let bookmarkService;
  let mockExecute;
  let mockBookmarkController;
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    // Setup mock for database connection
    mockExecute = jest.fn();
    connection.execute = mockExecute;
    
    // Create BookmarkService class
    class BookmarkService {
      constructor(dbConnection) {
        this.connection = dbConnection;
      }
    
      async addBookmark(userId, bookId) {
        const query = 'INSERT INTO USER_BOOK (User_ID, Book_ID) VALUES (?, ?)';
        try {
          const [results] = await this.connection.execute(query, [userId, bookId]);
          return results.insertId;
        } catch (error) {
          console.error(`Error adding bookmark for user ${userId}, book ${bookId}:`, error);
          throw error;
        }
      }
    
      async removeBookmark(userId, bookId) {
        const query = 'DELETE FROM USER_BOOK WHERE User_ID = ? AND Book_ID = ?';
        try {
          const [results] = await this.connection.execute(query, [userId, bookId]);
          return results.affectedRows > 0;
        } catch (error) {
          console.error(`Error removing bookmark for user ${userId}, book ${bookId}:`, error);
          throw error;
        }
      }
    
      async getUserBookmarks(userId) {
        const query = `
          SELECT b.Book_ID, b.Book_Name, b.Author, b.Accessibility, b.Description 
          FROM BOOK b
          JOIN USER_BOOK ub ON b.Book_ID = ub.Book_ID
          WHERE ub.User_ID = ?
        `;
        try {
          const [results] = await this.connection.execute(query, [userId]);
          return results;
        } catch (error) {
          console.error(`Error getting bookmarks for user ${userId}:`, error);
          throw error;
        }
      }
    }
    
    // Create service with mocked connection
    bookmarkService = new BookmarkService(connection);
    
    // Create BookmarkController class
    class BookmarkController {
      constructor(bookmarkService) {
        this.bookmarkService = bookmarkService;
        this.addBookmark = this.addBookmark.bind(this);
        this.removeBookmark = this.removeBookmark.bind(this);
        this.getUserBookmarks = this.getUserBookmarks.bind(this);
      }
      
      async addBookmark(req, res) {
        try {
          const { userId, bookId } = req.body;
          const result = await this.bookmarkService.addBookmark(userId, bookId);
          res.status(201).json({ id: result });
        } catch (error) {
          res.status(500).json({ message: 'Error adding bookmark' });
        }
      }
      
      async removeBookmark(req, res) {
        try {
          const { userId, bookId } = req.params;
          const result = await this.bookmarkService.removeBookmark(userId, bookId);
          if (result) {
            res.status(200).json({ message: 'Bookmark removed' });
          } else {
            res.status(404).json({ message: 'Bookmark not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Error removing bookmark' });
        }
      }
      
      async getUserBookmarks(req, res) {
        try {
          const { userId } = req.params;
          const bookmarks = await this.bookmarkService.getUserBookmarks(userId);
          res.status(200).json(bookmarks);
        } catch (error) {
          res.status(500).json({ message: 'Error retrieving bookmarks' });
        }
      }
    }
    
    // Create controller instance with mocked service
    mockBookmarkController = new BookmarkController(bookmarkService);
    
    // Mock request and response objects
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  // UT-19: User can bookmark a book (service test)
  test('UT-19: Successfully adds a bookmark (service)', async () => {
    // Arrange
    const userId = 1;
    const bookId = 42;
    
    mockExecute.mockResolvedValue([{ insertId: 123 }]);
    
    // Act
    const result = await bookmarkService.addBookmark(userId, bookId);
    
    // Assert
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO USER_BOOK (User_ID, Book_ID) VALUES (?, ?)',
      [userId, bookId]
    );
    expect(result).toBe(123);
  });

  // UT-19: User can bookmark a book (controller test)
  test('UT-19: Successfully adds a bookmark (controller)', async () => {
    // Arrange
    mockRequest.body = { userId: 1, bookId: 42 };
    mockExecute.mockResolvedValue([{ insertId: 123 }]);
    
    // Act
    await mockBookmarkController.addBookmark(mockRequest, mockResponse);
    
    // Assert
    expect(mockExecute).toHaveBeenCalledWith(
      'INSERT INTO USER_BOOK (User_ID, Book_ID) VALUES (?, ?)',
      [1, 42]
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ id: 123 });
  });

  // UT-20: User can delete a bookmark (service test)
  test('UT-20: Successfully removes a bookmark (service)', async () => {
    // Arrange
    const userId = 1;
    const bookId = 42;
    
    mockExecute.mockResolvedValue([{ affectedRows: 1 }]);
    
    // Act
    const result = await bookmarkService.removeBookmark(userId, bookId);
    
    // Assert
    expect(mockExecute).toHaveBeenCalledWith(
      'DELETE FROM USER_BOOK WHERE User_ID = ? AND Book_ID = ?',
      [userId, bookId]
    );
    expect(result).toBe(true);
  });

  // UT-20: User can delete a bookmark (controller test)
  test('UT-20: Successfully removes a bookmark (controller)', async () => {
    // Arrange
    mockRequest.params = { userId: '1', bookId: '42' };
    mockExecute.mockResolvedValue([{ affectedRows: 1 }]);
    
    // Act
    await mockBookmarkController.removeBookmark(mockRequest, mockResponse);
    
    // Assert
    expect(mockExecute).toHaveBeenCalledWith(
      'DELETE FROM USER_BOOK WHERE User_ID = ? AND Book_ID = ?',
      ['1', '42']
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Bookmark removed' });
  });

  // Handle non-existent bookmark deletion
  test('Returns false when trying to remove a non-existent bookmark', async () => {
    // Arrange
    const userId = 1;
    const bookId = 999; // Non-existent book
    
    mockExecute.mockResolvedValue([{ affectedRows: 0 }]);
    
    // Act
    const result = await bookmarkService.removeBookmark(userId, bookId);
    
    // Assert
    expect(result).toBe(false);
  });

  // Controller test for non-existent bookmark
  test('Returns 404 when trying to remove a non-existent bookmark (controller)', async () => {
    // Arrange
    mockRequest.params = { userId: '1', bookId: '999' };
    mockExecute.mockResolvedValue([{ affectedRows: 0 }]);
    
    // Act
    await mockBookmarkController.removeBookmark(mockRequest, mockResponse);
    
    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Bookmark not found' });
  });

  // Test retrieve bookmarks functionality
  test('Successfully retrieves user bookmarks', async () => {
    // Arrange
    const userId = 1;
    const mockBooks = [
      { Book_ID: 1, Book_Name: 'Book 1', Author: 'Author 1', Accessibility: 'Physical', Description: 'Desc 1' },
      { Book_ID: 2, Book_Name: 'Book 2', Author: 'Author 2', Accessibility: 'E-book', Description: 'Desc 2' }
    ];
    
    mockExecute.mockResolvedValue([mockBooks]);
    
    // Act
    const result = await bookmarkService.getUserBookmarks(userId);
    
    // Assert
    expect(mockExecute).toHaveBeenCalledWith(expect.any(String), [userId]);
    expect(result).toEqual(mockBooks);
  });

  // Error handling tests
  test('Handles database errors when adding bookmarks', async () => {
    // Arrange
    const userId = 1;
    const bookId = 42;
    
    const dbError = new Error('Database error');
    mockExecute.mockRejectedValue(dbError);
    
    // Act & Assert
    await expect(bookmarkService.addBookmark(userId, bookId)).rejects.toThrow(dbError);
  });

  test('Controller handles database errors when adding bookmarks', async () => {
    // Arrange
    mockRequest.body = { userId: 1, bookId: 42 };
    
    const dbError = new Error('Database error');
    mockExecute.mockRejectedValue(dbError);
    
    // Act
    await mockBookmarkController.addBookmark(mockRequest, mockResponse);
    
    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error adding bookmark' });
  });
});