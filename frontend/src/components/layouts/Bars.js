import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState, useRef } from "react";
import UpBar from "./up-bar";
import SideBar from "./sidebar";
import useWindowDimensions from "../../logic/WindowDimensions";


const Bars = () => {
    const [Icon, setIcon] = useState(MenuOutlinedIcon);
    const childRef = useRef();
    const { height, width } = useWindowDimensions();
    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="bars">
            {isOpen && width < 580 ? (
                <div
                    className="glass-background"
                    style={{
                        position: "fixed",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        zIndex: "3",
                        width: "100vw",
                        height: "100vh",
                    }}
                    onClick={() => {
                        childRef.current.collapse(setIcon);
                    }}
                ></div>
            ) : null}
            <UpBar />
            <div
                className="mobile-menu"
                onClick={() => {
                    childRef.current.collapse(setIcon);
                }}
            >
                {<Icon />}
            </div>
            <SideBar ref={childRef} setIcon={setIcon} Icon={Icon} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Bars;
