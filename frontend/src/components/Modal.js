import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";

const Modal = ({}) => {
    const { isOpen, closeModal, type, content } = useContext(ModalContext);
    const Icon =
        type == "Error" ? (
            <ErrorOutlineIcon />
        ) : type == "Success" ? (
            <CheckCircleOutlinedIcon />
        ) : type == "Loading" ? (
            <WatchLaterOutlinedIcon />
        ) : (
            <HelpOutlineIcon />
        );
    
    if (type == "Success") {
        setTimeout(() => {
            closeModal();
            console.log("close modal");
        }, 5000);
    }

    return (
        <div className={isOpen ? "modal open" : "modal close"}>
            <div className="modal-content">
                <div className="modal-row">
                    {Icon}
                    <div className="modal-information">
                        <h3>{type}</h3>
                        <p>{content}</p>
                    </div>
                </div>
                {type == "Loading" && <LinearProgress/>}

                <div className="modal-buttons">
                    <button onClick={closeModal}>Hide</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
