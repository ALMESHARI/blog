function getDate() {
    const date = new Date();
    const month = date.getUTCMonth();
    const monthName = date.toLocaleString("default", {
        month: "long",
    });
    const day = date.getUTCDate();
    return { month: monthName, day: day };
}

export {getDate}