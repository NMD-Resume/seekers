/*
  Container for either resume editing or displaying
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResumeForm from './ResumeForm';
import ResumeDisplay from './ResumeDisplay';

const sampleResume = {
  lastName: 'Ever',
  firstName: 'Greatest',
  summary: 'Summary',
  portfolio: ['https://google.com', 'https://linkedin.com'],
  skills: ['React', 'Mongo', 'Baking'],
  experience: [
    {
      start: 'Beginning of time',
      end: 'End of time',
      company: 'Big Pimpin',
      title: 'Big Playa forreal',
      content: 'Yeah i was pretty poppin',
      location: 'Errwhere, USA',
    }
  ],
  education: [
    {
      start: 'now',
      end: 'the future',
      school: 'Codesmith Academy for People Who Code Good',
      major: 'Swaggeneering',
      degree: 'PhD',
      location: 'Playa Vista, USA',
    }
  ],
};

class ResumeContainer extends Component {
  constructor() {
    super();
    this.state = {
      editing: true,
      resume: sampleResume,
    };
  }

  summaryChangeHandler(event) {
    // replaces the summary property in the state.resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, {summary: event.target.value});
    this.setState({
      resume: newResume
    });
  }
  
  portfolioChangeHandler(event, index) {
    // copy portfolio array
    const newLinks = this.state.resume.portfolio.slice();

    // then change the property in the experience at the given index
    newLinks[index] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, {portfolio: newLinks});

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
    Object.assign(newResume, this.state.resume, {skills: newSkills});

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
    Object.assign(newResume, this.state.resume, {experience: newExperience});

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
    Object.assign(newResume, this.state.resume, {education: newEducation});

    this.setState({
      resume: newResume
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();

    // TODO: post data to server 
    console.log(this.state.resume);
  }

  render() {
    return (this.state.editing) ?
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
      <ResumeDisplay resume={this.state.resume} />
  }
}

export default ResumeContainer;