import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../logic/WindowDimensions";
import "../../styles/layouts/sidebar.css";
// import icons
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import avatarURL from "../../images/avatar.png";

// for auth
import { useAuthContext } from "../../services/useAuthContext";



const SideBar = forwardRef(({ Icon, setIcon, isOpen, setIsOpen }, ref) => {
    useImperativeHandle(ref, () => ({
        collapse,
    }));

    const { height, width } = useWindowDimensions();
    // for auth
    const { state, dispatch } = useAuthContext();
    const isAuth = state.user !== null;
    const writer = isAuth ? state.user.writer : null;
    console.log(writer);
    


    const { collapseSidebar } = useProSidebar();
    const menus = [
        { name: "Explore", link: "Explore", icon: ExploreOutlinedIcon ,auth: false},
        { name: "Write new", link: "WriteNew", icon: CreateIcon , auth: true},
        { name: "My Blogs", link: "MyBlogs", icon: DescriptionOutlinedIcon , auth: true},
        { name: "Profile", link: "Profile", icon: AccountCircleOutlinedIcon ,auth: true},
        {
            name: "Notifications",
            link: "Notifications",
            icon: NotificationsNoneOutlinedIcon,
            auth: true,
        },
        { name: "Settings", link: "Settings", icon: SettingsOutlinedIcon , auth: false},
    ];
    // filter menus based on auth
    const filteredMenus = menus.filter((menu) => !menu.auth || isAuth);
    return (
        <Sidebar
            collapsedWidth={width < 580 ? "0px" : "60px"}
            id="sidebar"
            defaultCollapsed={true}
            style={{ height: "100vh" }}
        >
            <div
                className="desktop-menu"
                onClick={() => {
                    collapse(setIcon);
                }}
            >
                {<Icon />}
            </div>

            <Menu>
                <MenuItem style={{ textAlign: "right" }}></MenuItem>
                <div
                    className={
                        isOpen ? "micro-profile" : "micro-profile closed"
                    }
                > {isAuth && 
                    (<div className="personal-img-div">
                       
                        { writer.avatar && (<img
                            src={writer.avatar}
                            alt={writer.firstName}
                        />)}
                        </div>)}
                    
                    {isAuth && <h3 className="ps-menuitem-root">{`${writer.firstName} ${writer.lastName}`}</h3>}
                </div>
                <hr />
                {/* for each menu item */}
                {filteredMenus.map((menuItem) => (
                    <MenuItem
                        key={menuItem.link}
                        component={<Link to={menuItem.link} />}
                        className="createItem"
                        icon={<menuItem.icon />}
                        onClick={() => collapse(setIcon, "close")}
                    >
                        {menuItem.name}
                    </MenuItem>
                ))}
            </Menu>
            {isOpen && (
                <Link
                    className="login-link"
                    to={state.user !== null ? "Explore" : "Signup"}
                >
                    <button
                        onClick={() => {
                            if (state.user !== null) {
                                dispatch({ type: "LOGOUT" });
                            }
                            collapse(setIcon, "close");
                        }}
                        className="bar-login gb-button-style"
                    >
                        {state.user === null ? "LOGIN" : "LOGOUT"}
                    </button>
                </Link>
            )}
        </Sidebar>
    );
    function collapse(updateIcon, action = "toggle") {
        if (action === "close") {
            if (isOpen) {
                collapseSidebar();
                updateIcon(MenuOutlinedIcon);
                setIsOpen(false);
            }

            return;
        }
        // normal toggle
        collapseSidebar();
        if (isOpen) {
            updateIcon(MenuOutlinedIcon);
            setIsOpen(false);
        } else {
            updateIcon(ArrowBackIosNewIcon);
            setIsOpen(true);
        }
    }
});

export default SideBar;
