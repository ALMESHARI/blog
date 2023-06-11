const loadImageFromUrl = async (imageUrl) => {
    try {
        // Fetch the image data as a blob
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        // Convert the blob data to a data URL
        const reader = new FileReader();
        reader.onloadend = () => {
            // Once the reader has finished loading the blob data,
            // save it to local storage
            const imageData = reader.result;
            localStorage.setItem("myImage", imageData);
            console.log("Image saved to local storage.");
        };
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error("Error loading image:", error);
    }
};

const getImageFromLocalStorage = () => {
    // Retrieve the image data from local storage
    const imageData = localStorage.getItem("myImage");
    return imageData;
};

// Usage
// const imageUrl = "https://example.com/my-image.jpg";

// // Load the image from URL and save it to local storage
// loadImageFromUrl(imageUrl);

// // Retrieve the image data from local storage
// const imageData = getImageFromLocalStorage();

// // Display the image
// return <img src={imageData} alt="My Image" />;

export { loadImageFromUrl, getImageFromLocalStorage };