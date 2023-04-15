function getDate() {
    const date = new Date();
    const month = date.getUTCMonth();
    const monthName = date.toLocaleString("default", {
        month: "long",
    });
    const day = date.getUTCDate();
    return { month: monthName, day: day };
}
function toFormattedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
    });
}

export {getDate, toFormattedDate}