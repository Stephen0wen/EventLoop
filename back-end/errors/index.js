exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Invalid Request" });
    }
    if (err.code === "23502") {
        res.status(400).send({ msg: "Invalid Request Body" });
    }
    if (err.code === "22007") {
        res.status(400).send({ msg: "Invalid Request Body" });
    } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
    res.status(500).send({ msg: "Internal Server Error" });
};
