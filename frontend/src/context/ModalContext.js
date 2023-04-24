import React, { createContext, useState } from "react";

// Create a context for the modal state
export const ModalContext = createContext();

// Modal context provider component
export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [type, setType] = useState("Success");
    const [content, setContent] = useState("lodaing the data...");


    const openModal = ({type, content}) => {
        setType(type);
        setContent(content);
        setIsOpen(true)
    };
    const closeModal = () => {
        setIsOpen(false)
    };

    // Define the modal styles and animations using CSS

    return (
        <ModalContext.Provider value={{ isOpen,type, content, openModal, closeModal, setType,setContent }}>
            {/* Render the overlay and modal components */}

            {children}
        </ModalContext.Provider>
    );
};
