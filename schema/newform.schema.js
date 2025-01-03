// backend/schema/newfolder.schema.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");
const formSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fields: { type: Array, default: [] }, 
    background: { type: String, default: "default" },
    createdAt: { type: Date, default: Date.now },
});


const Forms = mongoose.model("Forms", formSchema);

module.exports = {
    Forms
}