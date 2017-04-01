const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SubDocument for experienceSchema
// A "start" to store String start time of job
// A "company" to store String content of experience
// A "location" to store String location of experience
var jobPostingSchema = new Schema({
  start: String,
  company: String,
  location: String,
  position: String,
  summary: String,
  requirements: String,
  salary: String
})

var contactSchema = new Schema({
  email: String,
  phoneNumber: String,
  address: String
})

// Document schema to store user information
// A "username" that is String username of user
// A "firstName" that is String firstname of user
// A "lastName" that is String lastname of user
// A "type" that is a String of type of user, seeker(job) or hunter(employer)
// A "jobPosting" that is a String of texts summarizing job they are posting
// A "preferences" that is String Array to preferred qualities
const huntSchema = new Schema ({
  username: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  type: {type: String, required: true},
  contact: contactSchema,
  jobPosting: [jobPostingSchema],
  preferences: [String],
})

module.exports = mongoose.model('Hunt', huntSchema);
