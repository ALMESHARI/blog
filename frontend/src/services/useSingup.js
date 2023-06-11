import { useState } from "react";
import { useAuthContext } from "../services/useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const signup = async (data) => {

    };
}