DROP DATABASE IF EXISTS BOOKI;
CREATE DATABASE BOOKI;
USE BOOKI;

-- Create tables
DROP TABLE IF EXISTS BOOKI_USER;
CREATE TABLE BOOKI_USER (
	User_ID	INT PRIMARY KEY AUTO_INCREMENT,
    User_Email	VARCHAR(100) NOT NULL,
    Username VARCHAR(50) NOT NULL,
    User_Password VARCHAR(50) NOT NULL
);

-- This is for data the user fills out in the form, to be saved in the database before it is given to the LLM prompt!
DROP TABLE IF EXISTS LLM_PROMPT_DATA;
 CREATE TABLE LLM_PROMPT_DATA (
	LLM_Prompt_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES BOOKI_USER(User_ID),
    Genre VARCHAR(50),
    Number_Of_Recommendations VARCHAR(50),
    Age_Group VARCHAR(50),
    Book_Length VARCHAR(50),
    Author VARCHAR(100),
    Book_Language VARCHAR(50),
    Accessibility VARCHAR(50),
    Book_Description VARCHAR(700),
    Similar_Books VARCHAR(500)
);

-- This for the book recommendations the LLM prompt generates
DROP TABLE IF EXISTS BOOK;
CREATE TABLE BOOK (
	Book_ID INT PRIMARY KEY AUTO_INCREMENT,
    User_ID INT,
    FOREIGN KEY (User_ID) REFERENCES BOOKI_USER(User_ID),
    Book_Name VARCHAR(100),
    Author VARCHAR(100),
    Accessibility VARCHAR(50)
);

-- This user is needed for the database connection to the backend
ALTER USER 'connection'@'localhost' IDENTIFIED WITH mysql_native_password BY 'securepassword';
FLUSH PRIVILEGES;
