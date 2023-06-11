import { AuthContext } from "../context/AuthContext";
import { useContext, useNavigate} from "react";


export const useAuthContext = () => {
    const context = useContext(AuthContext);

    // Throw an error if the context doesn't inside an AuthProvider
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

export const useLogout = () => {
    const { navigate } = useNavigate();
    const { dispatch } = useAuthContext();
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
}
