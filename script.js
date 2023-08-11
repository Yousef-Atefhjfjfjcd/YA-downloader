const urlInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(urlInput.value);
        if (!response.ok) {
            throw new Error("Failed to fetch the file");
        }
        
        const contentType = response.headers.get("content-type");
        const filename = response.headers.get("content-disposition") || 'downloaded-file';
        const extension = filename.split('.').pop(); // Get the file extension
        
        const blob = await response.blob();
        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        
        // Clean up the object URL
        URL.revokeObjectURL(link.href);
    } catch(error) {
        alert("Failed To Download The File");
    }
});
