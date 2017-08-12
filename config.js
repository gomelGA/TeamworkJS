const mongoose = require('mongoose');
let db = mongoose.createConnection('mongodb://softuni_user:mag1karp@ds055875.mlab.com:55875/softuni_project');

module.exports = {
    db: db,
    bodyWrapper: "wrapper",
};
