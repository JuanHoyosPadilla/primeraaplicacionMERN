const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const noteSchema = new Schema({
    title: String,
    description: String,
    date: {type: Date, default: Date.now}
});

module.exports = model('Notes', noteSchema);