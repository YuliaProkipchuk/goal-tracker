function validateEmail(email){
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    return regex.test(email)
}
function validatePassword(password){
    return password.length>=6;
}
function validateName(name){
    return name.trim()!=='';
}
exports.validateEmail = validateEmail;
exports.validateName = validateName;
exports.validatePassword = validatePassword;