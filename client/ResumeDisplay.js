/*
  Public-facing read-only resume
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Job, School } from './resumeItems';

class ResumeForm extends Component {
  /*
    Form to send resume data to server
  */
  constructor(props) {
    super(props);
    this.resume = props.resume;
  }

  handleSubmit(e) {
    e.preventDefault();

    // TODO: post data to server 
    console.log('submitted');
  }

  render() {

    const toListItem = (item) => <li key={item}>{item}</li>;

    const portfolio = this.resume.portfolio.map(toListItem);
    const skills = this.resume.skills.map(toListItem);
    const experience = this.resume.experience.map(
      (job, i) => <Job job={job} key={i}/>
    );
    const education = this.resume.education.map(
      (school, i) => <School school={school} key={i}/>
    );

    return (
      <div>
        
        <h3>Summary</h3>
        <p>{this.resume.summary}</p>

        <h3>Portfolio</h3>
        <ul>{portfolio}</ul>
        
        <h3>Skills</h3>
        <ul>{skills}</ul>

        <h3>Experience</h3>
        <ul>{experience}</ul>

        <h3>Education</h3>
        <ul>{education}</ul>
      
        <button>Save</button>
      </div>
    );
  }
}

export default ResumeForm;