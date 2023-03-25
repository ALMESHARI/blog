function preventScrollVerticalBounceEffect(container) {
    setTouchScroll(true); //!: enable before the first scroll attempt

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouch, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("scroll", onScroll);

    function isTouchScroll() {
        return !!container.style.webkitOverflowScrolling;
    }

    let prevScrollTop = 0,
        prevTouchY,
        opid = 0;

    function setTouchScroll(on) {
        container.style.webkitOverflowScrolling = on ? "touch" : null;

        //Hint: auto-enabling after a small pause makes the start
        // smoothly accelerated as required. After the pause the
        // scroll position is settled, and there is no delta to
        // make over-bounce by dragging the finger. But still,
        // accelerated content makes short single over-bounce
        // as acceleration may not be off instantly.

        const xopid = ++opid;
        !on && setTimeout(() => xopid === opid && setTouchScroll(true), 250);

        if (!on && container.scrollTop < 16) container.scrollTop = 0;
        prevScrollTop = container.scrollTop;
    }

    function isBounceOverTop() {
        const dY = container.scrollTop - prevScrollTop;
        return dY < 0 && container.scrollTop < 16;
    }

    function isBounceOverBottom(touchY) {
        const dY = touchY - prevTouchY;

        //Hint: trying to bounce over the bottom, the finger moves
        // up the screen, thus Y becomes smaller. We prevent this.

        return (
            dY < 0 &&
            container.scrollHeight - 16 <=
                container.scrollTop + container.offsetHeight
        );
    }

    function onTouchStart(e) {
        prevTouchY = e.touches[0].pageY;
    }

    function onTouch(e) {
        const touchY = e.touches[0].pageY;

        if (isBounceOverBottom(touchY)) {
            if (isTouchScroll()) setTouchScroll(false);
            e.preventDefault();
        }

        prevTouchY = touchY;
    }

    function onTouchEnd() {
        prevTouchY = undefined;
    }

    function onScroll() {
        if (isTouchScroll() && isBounceOverTop()) {
            setTouchScroll(false);
        }
    }
}
