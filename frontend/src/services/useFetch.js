import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortCont = new AbortController();
        async function fetchData() {
            // recieve headers from server
            try {
                const res = await fetch(url, { signal: abortCont.signal });
                // recieve data from server
                const data = await res.json();
                if (res.ok) {
                    setData(data);
                    // error from server
                } else if (data.error) {
                    setError(data.error);
                }
                setIsLoading(false);
                console.log("canceled");
                // error from network
            } catch (err) {
                if (err.name === "AbortError") {
                    console.log("fetch aborted");
                } else {
                    setIsLoading(false);
                    setError("Could not fetch the data for that resource");
                }
            }
            return () => abortCont.abort();
        }

        fetchData();
    }, [url]);

    return { data, error, isLoading };
};

export default useFetch;
