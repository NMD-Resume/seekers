const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// SubDocument for experienceSchema
// A "start" to store String start time of experience
// An "end" to store String end time of experience
// A "content" to store String content of experience
// A "location" to store String location of experience
var experienceSchema = new Schema({
  start: String,
  end: String,
  company: String,
  title: String,
  content: String,
  location: String
})

// SubDocument for experienceSchema
// A "start" to store String start time of experience
// An "end" to store String end time of experience
// A "content" to store String content of experience
// A "location" to store String location of experience
var educationSchema = new Schema({
  start: String,
  end: String,
  school: String,
  major: String,
  degree: String,
  location: String
})

var portfolioSchema = new Schema({
  url: String,
  folderLink: String,
})

// Document schema to store user information
// A "username" that is String username of user
// A "firstName" that is String firstname of user
// A "lastName" that is String lastname of user
// A "password" that is String bcrypt password of user
// A "type" that is a String of type of user, seeker(job) or hunter(employer)
// A "summary" that is a String of texts summarizing user profile
// A "portfolio" that is String Array links to user project pages
// A "images" that is a String Array links to user's project images in file
// A "skills" that is a String Array of skills user wishes to display
// An "experience" with subDocument "experienceSchema"
// An "education" with subDocument "educationSchema"
// TODO: add employer schema requirements (stage 3)
const seekSchema = new Schema ({
  username: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  type: {type: String, required: true},
  summary: String,
  portfolio: [portfolioSchema],
  skills: [String],
  experience: [experienceSchema],
  education: [educationSchema]
});

module.exports = mongoose.model('Seek', seekSchema);
