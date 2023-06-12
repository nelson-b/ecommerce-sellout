export const getUIDateFormat = (apiDateFormat) => {
    var date = new Date(apiDateFormat);
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    return year + "-" + month + "-" + day;
}