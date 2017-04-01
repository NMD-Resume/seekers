import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { JobInput, SchoolInput } from './resumeItems';

class ResumeForm extends Component {
  /*
    Form to send resume data to server
  */
  constructor(props) {
    super(props);
  }

  render() {
    // creating list of input groups for each resume section
    const portfolio = this.props.resume.portfolio.map(
      (link, index) => (
        <li key={index}>
          <input
            type='text'
            value={link}
            onChange={event => this.props.portfolioChangeHandler(event, index)}
          />
        </li>
      )
    );
    const skills = this.props.resume.skills.map(
      (skill, index) => (
        <li key={index}>
          <input
            type='text'
            value={skill}
            onChange={event => this.props.skillsChangeHandler(event, index)}
          />
        </li>
      )
    );

    const experience = this.props.resume.experience.map(
      (job, index) => (
        <JobInput
          job={job}
          key={index}
          index={index}
          experienceChangeHandler={this.props.experienceChangeHandler}
        />
      )
    );
    const education = this.props.resume.education.map(
      (school, index) => <SchoolInput
        school={school}
        key={index}
        index={index}
        educationChangeHandler={this.props.educationChangeHandler}
      />
    );

    return (
      <form onSubmit={this.props.handleSubmit}>

        <h3>Summary</h3>
        <input
          type='text'
          name='summary'
          placeholder='Type your summary here'
          value={this.props.resume.summary}
          onChange={this.props.summaryChangeHandler}
        />

        <h3>Portfolio</h3>
        <ul>{portfolio}</ul>

        <h3>Skills</h3>
        <ul>{skills}</ul>

        <h3>Experience</h3>
        <ul>{experience}</ul>

        <h3>Education</h3>
        <ul>{education}</ul>

        <button>Save</button>
      </form>
    );
  }
}

export default ResumeForm;