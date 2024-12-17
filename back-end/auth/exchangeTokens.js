const { google } = require("googleapis");
const {
    client_id,
    client_secret,
} = require(`${__dirname}/../.env.google.json`);

exports.exchangeTokens = (code) => {
    const GOOGLE_CLIENT_ID = client_id;
    const GOOGLE_CLIENT_SECRET = client_secret;

    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        "http://localhost:5173"
    );

    return oauth2Client.getToken(code);
};
