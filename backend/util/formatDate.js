function formatDate(date){
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month+1}-${day}`
}
exports.formatDate = formatDate