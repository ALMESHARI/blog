import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import SideBar from "./components/layouts/sidebar";
import { useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { writer } from "./logic/objectSamples";
// import pages
import Home from "./pages/Home";
import Myblogs from "./pages/MyBlogs";
import WriteNew from "./pages/WriteNew";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
// sidebar icon
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useRef } from "react";
import UpBar from "./components/layouts/up-bar";
import Footer from "./components/layouts/footer";
import Bars from "./components/layouts/Bars";

function App() {
    return (
        <div id="App" style={({ height: "100vh" }, { display: "flex" })}>
            <BrowserRouter>
                <Bars />
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Myblogs" element={<Myblogs />} />
                        <Route
                            path="/WriteNew"
                            element={<WriteNew writer={writer} />}
                        />
                        <Route path="/Explore" element={<Explore />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Settings" element={<Settings />} />
                        <Route path="/Signup" element={<Signup />} />
                        <Route path="/Blog" element={<Blog />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
