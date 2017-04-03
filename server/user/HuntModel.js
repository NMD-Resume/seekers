const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
* SubDocument for jobPostingSchema
* A "start" to store String start time of job
* A "company" to store String content of job
* A "location" to store String location of job
* A "position" to store String position of job
* A "summary" to store String summary description of job
* A "requirement" to store String Array of required skills for the job
* A "salary" to store Number value of desired to pay salary for position
**/
var jobPostingSchema = new Schema({
  start: String,
  company: String,
  location: String,
  position: String,
  summary: String,
  requirements: [String],
  salary: Number
})

/**
* SubDocument for contactSchema
* An "email" to store String email to user
* A "phone" to store String phone number of user
* An "address" to store String address of user
**/

var contactSchema = new Schema({
  email: String,
  phoneNumber: String,
  address: String
})

// Document schema to store employer information
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
