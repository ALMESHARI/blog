const uploadImage = async (file, setError, setLoading,apiURI) => {
    const formData = new FormData();
    if (!file) {
        setError("Please select an image file");
        return;
    }
    formData.append("image", file);
    try {
        setLoading(true);
        const res = await fetch(apiURI, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        const url = data.url;
        setLoading(false);
        return url;
    } catch (err) {
        setError(err);
        setLoading(false);
    }
};

export default uploadImage;
