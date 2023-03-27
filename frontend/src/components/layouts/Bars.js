import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useRef } from "react";
import { useProSidebar } from "react-pro-sidebar";
import UpBar from "./up-bar";
import SideBar from "./sidebar";

const Bars = () => {
    const [Icon, setIcon] = useState(ArrowBackIosNewIcon);
    let { collapseSidebar } = useProSidebar();
    const childRef = useRef();
    return (
        <div className="bars">
            <UpBar />
            <div
                className="mobile-menu"
                onClick={() => {
                    childRef.current.collapse(setIcon);
                }}
            >
                {<Icon />}
            </div>
            <SideBar ref={childRef} setIcon={setIcon} Icon={Icon} />{" "}
        </div>
    );
};

export default Bars;
