import { api, type ArgsProps, type ApiResponse } from "../../src/client";

const fetchButton = document.getElementById("fetchButton") as HTMLButtonElement;
const resultOutput = document.getElementById("resultOutput") as HTMLPreElement;

// Use a public test API (JSONPlaceholder)
const testApiOptions: ArgsProps = {
    url: "https://jsonplaceholder.typicode.com/posts/1",
    contentType: "application/json",
    defaultErr: "Failed to fetch data from JSONPlaceholder",
};

async function fetchData() {
    if (!fetchButton || !resultOutput) { return; }

    fetchButton.disabled = true;
    resultOutput.textContent = "Fetching...";
    resultOutput.classList.remove("error");

    try {
        // Assuming the API returns an object like { userId: number, id: number, title: string, body: string }
        const result: ApiResponse<{ id: number; title: string; body: string }> = await api.get(testApiOptions);

        if (result.status === "ok") {
            resultOutput.textContent = JSON.stringify(result.response, null, 2);
        } else {
            // The error object is in result.response when status is "error"
            throw result.response; 
        }
    } catch (error: unknown) {
        // console.error("Error during fetch:", error);
        let errorMessage = "Unknown error";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "object" && error !== null && "message" in error) {
            // Attempt to extract message if it's an object with a message property
            errorMessage = String((error as { message: unknown }).message);
        } else if (typeof error === "string") {
            errorMessage = error;
        }
        
        resultOutput.textContent = `Error: ${errorMessage}\n\n${JSON.stringify(error, null, 2)}`;
        resultOutput.classList.add("error");
    } finally {
        fetchButton.disabled = false;
    }
}

if (fetchButton) {
    fetchButton.addEventListener("click", fetchData);
} else {
    // console.error('Fetch button not found!');
    if (resultOutput) {
        resultOutput.textContent = "Initialization Error: Fetch button element not found in HTML.";
        resultOutput.classList.add("error");
    }
}

// console.log('Web example script loaded.'); 