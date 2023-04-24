import ImageUpload from "../components/imageUploader";
import "../styles/pages/Signup.css";
import { useState, useEffect } from "react";
import { ReactComponent as AvatarSVG } from "../images/account-avatar.svg";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";
import uploadData from "../services/uploadData";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const modalContext = useContext(ModalContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        // for signup only
        if (!showLoginForm) {
            if (!confirmPassword || !firstName || !lastName || !email) {
                setError("Please fill out all fields");
                return;
            }

            if (password !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            if (!ValidateEmail(email)) {
                setError("Please enter a valid email address");
                return;
            }
        }
        // for both signup and login form
        if (!username || !password) {
            setError("Please fill out all fields");
            return;
        }

        if (loading) {
            setError("please wait until uploading avatar is done");
            return;
        }

        if (showLoginForm) {
            uploadData({
                url: "/api/writers/login",
                data: { username, password },
                modalContext,
                setLoading,
                setError,
            });
        } else {
            uploadData({
                url: "/api/writers/login",
                data: {
                    username,
                    password,
                    firstName,
                    lastName,
                    email,
                    avatarUrl,
                },
                modalContext,
                setLoading,
                setError,
            });
        }
        // Handle sign-up form submission here
        console.log(
            "email: ",
            email,
            "password: ",
            password,
            "confirmPassword: ",
            confirmPassword,
            "firstName: ",
            firstName,
            "lastName: ",
            lastName,
            "username: ",
            username,
            "avatarUrl: ",
            avatarUrl
        );
    };

    const handleSwitchToLogin = () => {
        setShowLoginForm(!showLoginForm);
    };

    useEffect(() => {
        // Reset the form fields when showing the sign-up form again
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
        setUsername("");
        setAvatarUrl("");
    }, [showLoginForm]);

    return (
        <div className="Signup-page">
            <div className="Signup">
                {!showLoginForm ? (
                    <ImageUpload
                        error={error}
                        setError={setError}
                        setLoading={setLoading}
                        setMainImageURL={setAvatarUrl}
                        submitType="auto"
                        textInside="Upload Avatar"
                    />
                ) : (
                    <div className="account-avatar">
                        <AvatarSVG />
                    </div>
                )}

                <form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            className="gb-input-style"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            className="gb-input-style"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {!showLoginForm && (
                        <>
                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirm Password:
                                </label>
                                <input
                                    className="gb-input-style"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    className="gb-input-style"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                    className="gb-input-style"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                    className="gb-input-style"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    )}
                </form>

                <p className="login-switcher" onClick={handleSwitchToLogin}>
                    {showLoginForm
                        ? "don't have an account?"
                        : "already have an account?"}
                </p>

                <div className="error-div">
                    {error && (
                        <p
                            className="error-message"
                            style={{
                                color: "red",
                                marginTop: "10px",
                            }}
                        >
                            {error}
                        </p>
                    )}
                </div>

                <button
                    className="gb-button-style"
                    type="submit"
                    onClick={handleSubmit}
                >
                    {showLoginForm ? "LOGIN" : "SIGN UP"}
                </button>
            </div>
        </div>
    );
};

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    alert("You have entered an invalid email address!");
    return false;
}

export default Signup;
