const testData = require("../test-data/index.js");
const seed = require("./seeds.js");
const db = require("../connection.js");

const runSeed = () => {
    return seed(testData).then(() => db.end());
};

runSeed();
