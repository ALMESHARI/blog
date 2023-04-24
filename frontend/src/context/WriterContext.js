import { createContext } from "react";

export const WriterContext = createContext();

export const WriterProvider = ({ children }) => {
    const [writer, setWriter] = useState(null);
    
    return (
        <WriterContext.Provider value={{ writer, setWriter }}>
        {children}
        </WriterContext.Provider>
    );
    }
