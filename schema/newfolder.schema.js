// backend/schema/newfolder.schema.js
const mongoose = require('mongoose');
const {Forms} = require("../schema/newform.schema");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");
const folderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Forms' }], // References forms
    createdAt: { type: Date, default: Date.now },
});

const Folder = mongoose.model('Folder', folderSchema);
module.exports = {
    Folder
}
