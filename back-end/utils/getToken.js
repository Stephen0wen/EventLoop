axios = require("axios");
const credentials = require("../db/test-data/test.user.credentials.json");
const serviceAccount = require(`${__dirname}/../.env.firebase.json`);

exports.getToken = (user_id) => {
    const { email, password } = credentials[user_id];
    return axios
        .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${serviceAccount.api_key}`,
            {
                email,
                password,
                returnSecureToken: true,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(({ data: { idToken } }) => {
            return idToken;
        });
};
