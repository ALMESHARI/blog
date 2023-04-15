import React from "react";
const Footer = () => {
    return <div className="footer" style={style}></div>;
};

const style = {
    height: "100px",
    width: "100%",
    backgroundColor: "var(--bg-bar-color)",
    borderTop: "var(--border)",
};

export default React.memo(Footer);
