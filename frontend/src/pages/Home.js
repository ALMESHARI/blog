import { width } from "@mui/system";
import Sidebar from "../components/layouts/sidebar";

const Home = () => {
    return (
        <div
            className="home"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <header className="title">home page</header>
        </div>
    );
};

export default Home;
