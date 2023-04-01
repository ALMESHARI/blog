import React, { useState } from "react";
import "../styles/ImageUpload.css";


// if changed is true then the button is enabled
// if it is not changed then it should not allows to reupload the image

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [changed, setChanged] = useState(true);

    const handleFileSelect = (selectedFile) => {
        if (!selectedFile) {
        
            return;}
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
        submitting()
    };

    const submitting = async () => {
        const formData = new FormData();
        if (!file) {
            alert("Please select an image file");
            return;
        }
        formData.append("image", file);
        const response = await fetch("/api/images/upload", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        setChanged(false); // disable the button until changes are made
        console.log(data.url);
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
            
            <button disabled={!changed || !file}
                onClick={handleSubmit}
                className="upload-button gb-button-style"
                // style={file?{opacity:1}:{opacity:0.5}}
            >
                {!changed && file ? "UPLOADED": "UPLOAD"}
            </button>
        </div>
    );
}

export default ImageUpload;
