import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../logic/WindowDimensions";


const SideBar = forwardRef(({Icon,setIcon}, ref) => {
    useImperativeHandle(ref, () => ({
        collapse,
    }));
    const { height, width } = useWindowDimensions();
    const { collapseSidebar } = useProSidebar();
    const [isOpen, setIsOpen] = useState(true);
    const menus = [
        { name: "Explore", link: "Explore", icon: ExploreOutlinedIcon },
        { name: "Write new", link: "WriteNew", icon: CreateIcon },
        { name: "My Blogs", link: "MyBlogs", icon: DescriptionOutlinedIcon },
        { name: "Profile", link: "Profile", icon: AccountCircleOutlinedIcon },
        {
            name: "Notifications",
            link: "Notifications",
            icon: NotificationsNoneOutlinedIcon,
        },
        { name: "Settings", link: "Settings", icon: SettingsOutlinedIcon },
        {name:"Sign up" , link:"Signup" , icon:HelpOutlineOutlinedIcon},
    ];
    return (
        <Sidebar
            collapsedWidth={width < 580 ? "0px" : "80px"}
            id="sidebar"
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
                >
                    <div className="personal-img-div">
                        <img
                            src="https://lumiere-a.akamaihd.net/v1/images/character_themuppets_kermit_b77a431b.jpeg"
                            alt=""
                        />
                    </div>
                    <h3 className="ps-menuitem-root">RIDHA ALMESHARI</h3>
                </div>

                <hr />
                {/* for each menu item */}
                {menus.map((menuItem) => (
                    <MenuItem
                        key={menuItem.link}
                        component={<Link to={menuItem.link} />}
                        className="createItem"
                        icon={<menuItem.icon />}
                    >
                        {menuItem.name}
                    </MenuItem>
                ))}
            </Menu>
        </Sidebar>
    );
    function collapse(updateIcon) {
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
