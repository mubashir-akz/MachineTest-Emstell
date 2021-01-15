require('dotenv').config()
const mongoClient = require("mongodb").MongoClient;
const state = {
    db: null,
};
// eslint-disable-next-line no-undef
module.exports.connect = function (done) {
    // eslint-disable-next-line no-undef
    const url = process.env.DB_CONFIG;
    const dbname = "MachineTest";

    mongoClient.connect(url, { useUnifiedTopology: true }, (err, data) => {
        if (err) return done(err);
        state.db = data.db(dbname);  
        done();
    });
};
// eslint-disable-next-line no-undef
module.exports.get = function () {
    return state.db;
};