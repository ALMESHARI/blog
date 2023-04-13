import React, { useState } from "react";
import "../styles/components/ImageUpload.css";
import uploadImage2 from "../services/uploadImage";

// if changed is true then the button is enabled
// if it is not changed then it should not allows to reupload the image

function ImageUpload({ setMainImageURL,error, setError, setLoading }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [changed, setChanged] = useState(true);

    const handleFileSelect = (selectedFile) => {
        if (!selectedFile) {
            return;
        }
        if (!selectedFile.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }
        setFile(selectedFile);
        setChanged(true);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const selectedFile = event.dataTransfer.files[0];
        handleFileSelect(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!changed) return;
        if (!file) {
            alert("Please select an image file");
            return;
        }
        let url =  await uploadImage2({
            file,
            setIsLoading: setLoading,
            apiURI: "/api/images/upload/main",
            setError,
        });
        if (!error) {
            setChanged(false);
            setMainImageURL(url);
        }
        
    };

    const submitting = async (file) => {
        const formData = new FormData();

        setLoading(true);
        try {
            formData.append("image", file);
            const response = await fetch("/api/images/upload/main", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setLoading(false);
            setMainImageURL(data.url);
            setChanged(false);
        } catch (err) {
            setError(err);
        }
        // disable the button until changes are made
    };

    return (
        <div className="image-upload">
            <div
                className="image-viewer"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <form onSubmit={handleSubmit}>
                    <label htmlFor="upload-file" className="upload-label">
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="preview-image"
                            />
                        ) : (
                            <div className="upload-placeholder">
                                <i className="fas fa-cloud-upload-alt"></i>
                                <div className="upload-text">
                                    Drag and drop image here or click to upload
                                </div>
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="upload-file"
                        accept="image/*"
                        className="upload-input"
                        onChange={(event) => {
                            handleFileSelect(event.target.files[0]);
                        }}
                    />
                </form>
            </div>

            <button
                disabled={!changed || !file}
                onClick={handleSubmit}
                className="upload-button gb-button-style"
            >
                {!changed && file ? "UPLOADED" : "UPLOAD"}
            </button>
        </div>
    );
}

export default ImageUpload;
