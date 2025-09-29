// Example usage of the server-side part of the library
// Import the server API instance and relevant types
import { nodeApi, type ArgsProps, type ApiResponse } from "boilerplate-api-core-library/server";

// eslint-disable-next-line no-console
console.log("Server example loaded.");

// Example: Configure options for a GET request on the server using a public API
const getRequestOptions: ArgsProps = {
    url: "https://jsonplaceholder.typicode.com/todos/1", // Using JSONPlaceholder public API
    contentType: "application/json", // Usually not strictly needed for GET, but good practice
    // body: JSON.stringify({ key: 'server-value', timestamp: Date.now() }), // No body needed for GET
    defaultErr: "Failed to fetch TODO data from server"
};

// You can now use the 'nodeApi' object with the methods defined in your core library
// Example using the 'get' method
async function fetchData() {
    // eslint-disable-next-line no-console
    console.log(`Fetching data from ${getRequestOptions.url}...`);
    // Assuming the API returns an object like { userId: number, id: number, title: string, completed: boolean }
    const result: ApiResponse<{ userId: number, id: number, title: string, completed: boolean }> = await nodeApi.get(getRequestOptions);

    if (result.status === "ok") {
        // eslint-disable-next-line no-console
        console.log("Data fetched successfully:", JSON.stringify(result.response, null, 2));
    } else {
        // eslint-disable-next-line no-console
        console.error("Error fetching data:", result.response); // The error object is in response on failure
    }
}

fetchData();

// Initialize or use server features
// const server = new ServerClass(/* config */);
// server.start(); 