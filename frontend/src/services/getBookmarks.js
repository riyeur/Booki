// This class will fetch the bookmarks from the SQL database and return them

const getBookmarks = async () => {
    // This simulates the data that will be returned from the database for the purpose of showing 
    // the UI functionality works correctly
    return [
        { id: 1, bookName: "The Silent Patient", authorName : "Alex Michaelides", 
            accessibilityInfo: "Available as a physical copy, digital (eBook), and audiobook.", 
            bookDescription: "Alicia Berenson, a famous painter, shoots her husband five times in the face, and then never speaks another word. Theo Faber, a forensic psychotherapist, becomes obsessed with her case and is determined to get her to talk and uncover the truth behind the murder. The book weaves between Alicia's diary entries and Theo's therapy sessions, creating a suspenseful and twist-filled narrative."},
        { id: 2, bookName: "One of Us Is Lying", authorName : "Karen M. McManus", 
            accessibilityInfo: "Available as a physical copy, digital (eBook), and audiobook.", 
            bookDescription: "Five students enter detention, but only four come out alive. Simon, the creator of a notorious gossip app, is dead, and the other four students—Bronwyn, Addy, Nate, and Cooper—are all suspects. Each has a secret they're desperate to protect, and as the investigation deepens, they realize they're all connected in ways they never imagined. This is a fast-paced, character-driven mystery with plenty of twists and turns."},
        { id: 3, bookName: "The Thursday Murder Club", authorName : "Richard Osman", 
            accessibilityInfo: "Available as a physical copy, digital (eBook), and audiobook.", 
            bookDescription: "In a peaceful retirement village, four unlikely friends—Elizabeth, Joyce, Ibrahim, and Ron—meet weekly to investigate unsolved murders. They call themselves the Thursday Murder Club. When a local developer is found dead, they find themselves in the middle of a real-life case. Richard Osman's writing is witty and charming, making this a delightful and engaging mystery."}
    ];
};

export {getBookmarks};