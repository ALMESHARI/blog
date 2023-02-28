import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// import pages
import Home from "./pages/Home";
import Myblogs from "./pages/MyBlogs";
import WriteNew from "./pages/WriteNew";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
// sidebar icon
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useRef } from "react";

function App() {
    const [Icon, setIcon] = useState(ArrowBackIosNewIcon);
    const childRef = useRef();

    return (
        <div id="App" style={({ height: "100vh" }, { display: "flex" })}>
            <BrowserRouter>
                <div
                    className="mobile-menu"
                    onClick={() => {
                        childRef.current.collapse(setIcon);
                    }}
                >
                    {<Icon />}
                </div>
                <SideBar ref={childRef} />
                <div className="pages">
                    <div className="search-bar"></div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Myblogs" element={<Myblogs />} />
                        <Route path="/WriteNew" element={<WriteNew />} />
                        <Route path="/Explore" element={<Explore />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Settings" element={<Settings />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
