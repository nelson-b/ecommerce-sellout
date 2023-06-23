export const getUIDateFormat = (apiDateFormat, isListScreen) => {
    var date = new Date(apiDateFormat);
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    return isListScreen?(day + "-" + month + "-" + year):(year + "-" + month + "-" + day);
}

export const getAPIDateFormatWithTime = (inputDate) => {
    console.log('inputDate', inputDate);
    var date = new Date(inputDate);
    var time = (date.toISOString().split('T')[1]).substring(0, 8);
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    return (year + "-" + month + "-" + day).concat(" ",time);
}

export const getUIDateFormatToCompare = (apiDateFormat) => {
    console.log('apiDateFormat', apiDateFormat);
    var date = new Date(apiDateFormat);
    var time = (date.toISOString().split('T')[1]).substring(0, 8);
    var day = date.getDate().toString().padStart(2, "0");
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear().toString();
    return (month + "/" + day + "/" + year);
}