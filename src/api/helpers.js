/**
 * A utility function to make a network api call
 *
 * @param {string} apiUrl
 * @return {Promise<Object>}
 */
export async function request(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("API request failed");
        }
        return response.json();
    } catch (error) {
        throw new Error("An error occurred while making the API request");
    }
}
