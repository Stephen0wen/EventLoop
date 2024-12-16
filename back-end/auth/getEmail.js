const { admin } = require("./firebase.config.js");

exports.getFirebaseUser = async (request) => {
    const token = request.headers.auth;
    return admin
        .auth()
        .verifyIdToken(token)
        .then((user) => {
            return user;
        });
};
