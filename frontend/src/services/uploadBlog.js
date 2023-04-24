// const uploadBlog = ({
//     title,
//     description,
//     body,
//     writerID,
//     tag,
//     mainImage,
//     status = "under review",
//     publishDate,
//     setLoading,
//     setError,
// }) => {
//     fetch("api/blogs/newBlog", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             title,
//             description,
//             body,
//             writerID,
//             tag,
//             mainImage,
//             status,
//             publishDate,
//         }),
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             setLoading(false);
//             setError(null);
//         })
//         .catch((err) => {
//             setLoading(false);
//             setError(err);
//         });
// };


async function uploadBlog({
    url,
    data,
    setLoading,
    setError,
    successCallback=null
}) {
    // await new Promise((r) => setTimeout(r, 5000));

    const abortCont = new AbortController();
    // recieve headers from server
    try {
        setLoading(true);
        const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }, { signal: abortCont.signal });
        // check data from server
        const resData = await res.json();
        if (!res.ok){
            setError(resData.error);
        }

        setLoading(false);
        // error from network
    } catch (err) {
        if (err.name === "AbortError") {
            console.log("upload aborted");
        } else {
            setLoading(false);
            setError(`Could not upload the data ${err.message}`);
        }
    }
    return () => abortCont.abort();
}



export default uploadBlog;
