import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
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
import Bars from "./components/layouts/Bars";
// export contexts
import { ModalProvider } from "./context/ModalContext";
import Modal from "./components/Modal";
import  Backdrop  from "./components/Backdrop";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <div id="App" style={({ height: "100vh" }, { display: "flex" })}>
            <BrowserRouter>
                <AuthProvider>
                    <ModalProvider>
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
                                <Route
                                    path="/Settings"
                                    element={<Settings />}
                                />
                                <Route path="/Signup" element={<Signup />} />
                                <Route path="/Blog/:id" element={<Blog />} />
                            </Routes>
                        </div>
                        <Modal />
                    </ModalProvider>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
