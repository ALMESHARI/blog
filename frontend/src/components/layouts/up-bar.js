import ThemeBtn from "../theme-btn";
import React from "react";
import "../../styles/layouts/up-bar.css";

const UpBar = () => {

    return (
        <div className="up-bar" style={style}>
            <div
                style={{
                    width: "26px",
                    height: "26px",
                }}
            ></div>

            <h3 style={{ color: "unset" }}>
                <i>
                    <span
                        style={{
                            color: "grey",
                            textDecoration: "italic",
                        }}
                    >
                        M
                    </span>
                </i>
                odawan
            </h3>
            <ThemeBtn />
        </div>
    );
};

const style = {
    
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "var(--bg-bar-color)",
        color: "white",
    padding: "22px",
}

export default UpBar;
