export const checkUsernameValidity = (username, callback) => {
    let err = null;

    if (username.toString().trim().length < 4) {
        err = "Username should be 4 characters long";
    }

    callback(err);
}