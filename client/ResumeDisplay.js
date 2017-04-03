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

    // shows contact info if any
    let contactInfo;
    const contactInfoKeys = this.resume.contactInfo && Object.keys(this.resume.contactInfo);
    if (contactInfoKeys && contactInfoKeys.length) {
      contactInfo = (
        <div>
          <h4>Contact Info</h4>
          <ul>
            {this.resume.contactInfo.email &&
              <li>Email: {this.resume.contactInfo.email}</li>
            }
            {this.resume.contactInfo.phoneNumber &&
              <li>Phone Number: {this.resume.contactInfo.phoneNumber}</li>
            }
            {this.resume.contactInfo.address &&
              <li>Address: {this.resume.contactInfo.address}</li>
            }
          </ul>
        </div>
      );
    }

    return (
      <div className="mdl-card__supporting-text">
        
        <h4>Summary</h4>
        <p>{this.resume.summary}</p>

        {contactInfo}

        <h4>Portfolio</h4>
        <ul>{portfolio}</ul>
        
        <h4>Skills</h4>
        <ul>{skills}</ul>

        <h4>Experience</h4>
        <ul>{experience}</ul>

        <h4>Education</h4>
        <ul>{education}</ul>
        
        <button type="button" className="btn btn-success btn-xs" onClick={() => window.location = '/newuser/' + this.props.resume.username}>Edit</button>

      </div>
    );
  }
}

export default ResumeForm;