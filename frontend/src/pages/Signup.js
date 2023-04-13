import "../styles/pages/Signup.css";
const Signup = () => {
    return (
        <div className="Signup">
            <h1>Signup</h1>
            <form action="/MyBlogs" method="GET">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button
                    onClick={() => {
                        console.log("Signup");
                    }}
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
