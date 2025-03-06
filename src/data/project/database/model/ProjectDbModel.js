const mongoose = require('mongoose');

module.exports = (connection) => {
    const projectDbModel = new mongoose.Schema({
        name: {type: String, required: true, unique: true}
    })
    return connection.model('Bucket', projectDbModel , "projects");
};
