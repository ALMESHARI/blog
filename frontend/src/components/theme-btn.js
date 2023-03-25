const ThemeBtn = () => {

    const themeBtnFunction = () => {
        if (document.body.hasAttribute("data-theme")) {
            document.body.removeAttribute("data-theme");
        } else {
            document.body.setAttribute("data-theme", "dark");
        }
    };

    return (
        <div id="theme-btn" onClick={themeBtnFunction}>
            <div className="theme-cir" id="theme-cir1"></div>
            <div className="theme-cir" id="theme-cir2"></div>
        </div>
    );
};

export default ThemeBtn;
