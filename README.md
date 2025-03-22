## **Booki**

Booki is an app designed to provide personalized book recommendations based on user inputs. It helps users discover books that align with their preferred genres, authors, and other preferences.

### **Running the App on Railway**

To run the Booki app on Railway, click the following link to access the deployment: 
https://booki-production.up.railway.app/

### **Running the App Locally**

To run Booki locally, follow these steps for both the frontend and backend:

1. Clone the main repository and navigate into the Booki directory:

2. You will also need to:
- Create a `.env` file for the frontend and update it with the necessary variables.
- Update the `.env` file for the backend 
- Update the `connection.js` file for the database connection.
- The `.env` files and connection.js files will be available in the D2L submission, as they should not be included in the public GitHub repository for security reasons.
- Set up an SQL database. The necessary SQL scripts for setting up the database are provided in the `BookiDatabase.sql` in the GitHub repository.

3. **Frontend Setup:**
- Navigate to the frontend folder:
  ```
  cd frontend
  ```
- Install the dependencies:
  ```
  npm install
  ```
- Start the frontend app:
  ```
  npm start
  ```

4. **Backend Setup:**
- Open a new terminal window and navigate to the backend folder:
  ```
  cd backend
  ```
- Install the dependencies:
  ```
  npm install
  ```
- Start the backend server:
  ```
  node app.js
  ```

Your app should now be running locally on your machine!

