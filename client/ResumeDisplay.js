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

    // get only portfolio urls for now
    const portfolio = this.resume.portfolio.map(proj => proj.url).map(toListItem);
    const skills = this.resume.skills.map(toListItem);
    const experience = this.resume.experience.map(
      (job, i) => <Job job={job} key={i}/>
    );
    const education = this.resume.education.map(
      (school, i) => <School school={school} key={i}/>
    );

    return (
      <div className="mdl-card__supporting-text">
        
        <h4>Summary</h4>
        <p>{this.resume.summary}</p>

        <h4>Portfolio</h4>
        <ul>{portfolio}</ul>
        
        <h4>Skills</h4>
        <ul>{skills}</ul>

        <h4>Experience</h4>
        <ul>{experience}</ul>

        <h4>Education</h4>
        <ul>{education}</ul>
      

      </div>
    );
  }
}

export default ResumeForm;