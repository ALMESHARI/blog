import React, { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

const Backdrop = () => {

    const { isOpen, closeModal } = useContext(ModalContext);

    const overlayStyles = {
        transition: "0.3s ease-out",
        opacity: isOpen ? 0.5 : 0,
        display: isOpen ? "block" : "none",
        zIndex: 1000,
        position: "absolute",
        top: 0,
        height: "100vh",
        width: "100vw",
    
    };
    return (
        <div
            className="backdrop"
            style={overlayStyles}
            onClick={closeModal}
        ></div>
    );
};

export default Backdrop;
