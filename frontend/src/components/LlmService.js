
//function that sends a post request to the backend (from the frontend)

export async function getBookRecs(formData){
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/llm/generate-books`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),

        });

        if (!response.ok) {
            console.error(`Error: ${response.status}`);
        };

        return await response.json();

    } catch (error) {
        console.error("Error getting book recommendations:",error);
        return[];
    }

}