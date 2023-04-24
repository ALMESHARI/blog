import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const uploadData = async ({
    url,
    data,
    setLoading,
    setError,
    successCallback = null,
    modalContext,
}) => {
    const { openModal } = modalContext;

    const abortCont = new AbortController();
    // recieve headers from server
    try {
        setLoading(true);
        openModal({ type: "Loading", content: `Uploading to ${url}...` });
        await new Promise((r) => setTimeout(r, 15000));

        const res = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
            { signal: abortCont.signal }
        );
        // check data from server
        const resData = await res.json();
        if (!res.ok) {
            setError(resData.error);
            openModal({ type: "Error", content: resData.error });
        } else {
            openModal({ type: "Success", content: "Upload successful!" });
        }
        setLoading(false);

        // error from network
    } catch (err) {
        if (err.name === "AbortError") {
            console.log("upload aborted");
        } else {
            setLoading(false);
            setError(`Could not upload the data ${err.message}`);
            openModal({
                type: "Error",
                content: `Could not upload the data ${err.message}`,
            });

        }
    }
    return () => abortCont.abort();
};

export default uploadData;
