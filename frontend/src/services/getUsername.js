// This class will fetch the username of the current user from the SQL database

const getUsername = async () => {
    // This simulates the data that will be returned from the database for the purpose of showing 
    // the UI functionality works correctly
    return [
        {username: "Mel"}
    ];
};

export {getUsername};