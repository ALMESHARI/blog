import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreateIcon from "@mui/icons-material/Create";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useImperativeHandle, forwardRef } from "react";
import { Link } from "react-router-dom";
const SideBar = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        collapse
    }));
    const { collapseSidebar } = useProSidebar();
    const [isOpen, setIsOpen] = useState(true);
    const menus = [
        { name: "Explore", link: "Explore", icon: HomeOutlinedIcon },
        { name: "Write new", link: "WriteNew", icon: CreateIcon },
        { name: "My Blogs", link: "MyBlogs", icon: CalendarTodayOutlinedIcon },
        { name: "Profile", link: "Profile", icon: AccountCircleIcon },
        { name: "Settings", link: "Settings", icon: HelpOutlineOutlinedIcon },
    ];
    return (
        <Sidebar id="sidebar" style={{ height: "100vh" }}>
            {/* <MenuOutlinedIcon className="mobile-menu" /> */}

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
