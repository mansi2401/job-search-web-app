const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema({
    company: String,
    category: String,
    location: String,
    Salary: String,
    Application: String
});

module.exports = mongoose.model("jobs",jobsSchema);