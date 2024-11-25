const express = require("express");
const {
    handleCustomErrors,
    handlePsqlErrors,
    handleServerErrors,
} = require("./errors/index.js");
const apiRouter = require("./routes/api.router");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
