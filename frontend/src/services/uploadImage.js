const uploadImage = async (
    formData,
    setError = null,
    setLoading = null,
    apiURI
) => {
    try {
        setError(null);
        setLoading(true);
        let data;
  await new Promise((resolve) => setTimeout(resolve, 18000));
        const res = await fetch(apiURI, {
            method: "POST",
            body: formData,
        }).then( async (res) => {
            if (res.ok) {
                data = await res.json();
                setLoading(false);
            } else {
                setLoading(false);
                throw "image upload failed";
            }
        });
        return data.url;
    } catch (err) {
        setError(err);
        setLoading(false);
    }
};

export default uploadImage;
