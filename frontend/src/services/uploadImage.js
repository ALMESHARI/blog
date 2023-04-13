export default uploadImage;


// params: url, file, setLoading, setError
async function uploadImage({ apiURI, file, setIsLoading, setError }) {
    const abortCont = new AbortController();
    // recieve headers from server
    try {
        const formData = new FormData();

        setIsLoading(true);
        formData.append("image", file);
        const res = await fetch(
            apiURI,
            {
                method: "POST",
                body: formData,
            },
            { signal: abortCont.signal }
        );
        // check data from server
        const resData = await res.json();
        if (!res.ok) {
            setError(resData.error);
        }
        setIsLoading(false);
        // return image url
        return resData.url
        // error from network
    } catch (err) {
        if (err.name === "AbortError") {
            console.log("upload aborted");
        } else {
            setIsLoading(false);
            setError("Could not upload the image");
        }
    }
    return () => abortCont.abort();
}
