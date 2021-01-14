require('dotenv').config()
const mongoClient = require("mongodb").MongoClient;
const state = {
    db: null,
};
// eslint-disable-next-line no-undef
module.exports.connect = function (done) {
    // eslint-disable-next-line no-undef
    const url = 'mongodb+srv://mubas:q4YdWcKNrlLKlGbV@cluster0.qamji.mongodb.net/todo?retryWrites=true&w=majority'
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