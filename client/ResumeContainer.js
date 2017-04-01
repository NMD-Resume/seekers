/*
  Container for either resume editing or displaying
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResumeForm from './ResumeForm';
import ResumeDisplay from './ResumeDisplay';
import fetch from 'node-fetch';
import queryStr from 'query-string';

// temp urls for moving data b/w API
const getResumeUrl = 'http://localhost:3000/seek/derek';
const patchResumeUrl = 'http://localhost:3000/derek';

class ResumeContainer extends Component {
  constructor() {
    super();
    this.state = {
      editing: true,
    };
  }

  componentWillMount() {
    // before component mounts, start a GET request for resume data

    // function to bind setState to the component during async function
    const setResume = (resume) => this.setState.call(this, { resume });

    // makes request and gets resume json data
    (async function () {
      const res = await fetch(getResumeUrl);
      const resumeData = await res.json();

      // remove _id since unnecessary
      // as well as to avoid Mongoose error that occurs 
      // when trying to update that property
      // delete resumeData._id;

      setResume(resumeData);
    })();
  }

  // onChange handlers passed down to inputs
  summaryChangeHandler(event) {
    // replaces the summary property in the state.resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { summary: event.target.value });
    this.setState({
      resume: newResume
    });
  }

  portfolioChangeHandler(event, index, projectProp) {
    // copy portfolio array
    const newLinks = this.state.resume.portfolio.slice();

    // then change the property in the experience at the given index
    newLinks[index][projectProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { portfolio: newLinks });

    this.setState({
      resume: newResume
    });
  }

  skillsChangeHandler(event) {
    // copy experience array
    const newSkills = this.state.resume.skills.slice();

    // then change the property in the experience at the given index
    newSkills[index] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { skills: newSkills });

    this.setState({
      resume: newResume
    });
  }

  experienceChangeHandler(event, index, jobProp) {
    // copy experience array
    const newExperience = this.state.resume.experience.slice();

    // then change the property in the experience at the given index
    newExperience[index][jobProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { experience: newExperience });

    this.setState({
      resume: newResume
    });
  }

  educationChangeHandler(event, index, jobProp) {
    // copy education array
    const newEducation = this.state.resume.education.slice();

    // then change the property in the education at the given index
    newEducation[index][jobProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { education: newEducation });

    this.setState({
      resume: newResume
    });
  }

  handleSubmit(e) {
    // prevent refresh
    e.preventDefault();

    // for node-fetch requests,
    // need to convert json body to a query string (e.g. "name=dude&key=value")
    // using query-string's stringify method
    const body = queryStr.stringify(this.state.resume);

    // function to bind setState to the component during async function
    const setResume = (resume) => this.setState.call(this, { resume });
    
    // make a patch request to update the current resume
    (async function () {
      try {
        const res = await fetch(patchResumeUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body
        });
        const result = await res.json();
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    })();
  }

  render() {
    const resumePage = (this.state.editing) ?
      <ResumeForm
        resume={this.state.resume}
        summaryChangeHandler={this.summaryChangeHandler.bind(this)}
        experienceChangeHandler={this.experienceChangeHandler.bind(this)}
        educationChangeHandler={this.educationChangeHandler.bind(this)}
        skillsChangeHandler={this.skillsChangeHandler.bind(this)}
        portfolioChangeHandler={this.portfolioChangeHandler.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
      />
      :
      <ResumeDisplay resume={this.state.resume} />;

    return (
      <div>
        {
          (this.state.resume)
            ?
            resumePage
            :
            <p>Loading resume...</p>
        }
      </div>
    )
  }
}

export default ResumeContainer;