/*
  Container for either resume editing or displaying
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResumeForm from './ResumeForm';
import ResumeDisplay from './ResumeDisplay';

const sampleResume = {
  username: 'name',
  password: 'pwd',
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
      loggedIn: true,
      resume: sampleResume,
    };
  }

  summaryChangeHandler(event, text) {
    console.log(text);
    // replaces the summary property in the state.resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, {summary: event.target.value});
    this.setState({
      resume: newResume
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();

    // TODO: post data to server 
    console.log('submitted');
  }

  render() {
    return (this.state.loggedIn) ?
      <ResumeForm
        resume={this.state.resume}
        summaryChangeHandler={this.summaryChangeHandler.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
      />
      :
      <ResumeDisplay resume={this.state.resume} />
  }
}

export default ResumeContainer;