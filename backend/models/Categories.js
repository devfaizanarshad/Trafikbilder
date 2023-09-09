const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    numberOfImages: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("categories", categorySchema);