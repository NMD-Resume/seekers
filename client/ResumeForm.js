import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { JobInput, SchoolInput } from './resumeItems';
import Button from 'react-bootstrap/lib/Button';
import { Forms, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class ResumeForm extends Component {
  /*
    Form to send resume data to server
  */
  render() {

    // creating list of input groups for each resume section
    const portfolio = this.props.resume.portfolio.map(
      (project, index) => (
        <li key={index}>
          <FormControl
            type="text"
            value={project.url}
            placeholder="Enter link"
            onChange={event => this.props.portfolioChangeHandler(event, index, 'url')}
          />
        {/*<input
            type='text'
            value={project.url}
            onChange={event => this.props.portfolioChangeHandler(event, index, 'url')}
          />*/}
          <button type="button" className="btn btn-danger btn-xs" onClick={() => this.props.removeProject(index)}>Remove Project</button>
          {/*<input
            type='button'
            onClick={() => this.props.removeProject(index)}
            value='Remove Project'
          />*/}
        </li>
      )
    );

    const skills = this.props.resume.skills.map(
      (skill, index) => (
        <li key={index}>
          <FormControl
            type="text"
            value={skill}
            placeholder="Enter skill"
            onChange={event => this.props.skillsChangeHandler(event, index)}
          />
        {/*}<input
            type='text'
            value={skill}
            onChange={event => this.props.skillsChangeHandler(event, index)}
          />*/}
          <button type="button" className="btn btn-danger btn-xs" onClick={() => this.props.removeSkill(index)}>Remove Skill</button>
          {/*<input
            type='button'
            onClick={() => this.props.removeSkill(index)}
            value='Remove Skill'
          />*/}
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
          removeJob={this.props.removeJob}
        />
      )
    );

    const education = this.props.resume.education.map(
      (school, index) => <SchoolInput
        school={school}
        key={index}
        index={index}
        educationChangeHandler={this.props.educationChangeHandler}
        removeSchool={this.props.removeSchool}
      />
    );

    return (
      <form onSubmit={this.props.handleSubmit} className="mdl-card__supporting-text">

        <h4>Summary</h4>
        <FormControl
          type="text"
          placeholder="Type your summary here"
          name='summary'
          value={this.props.resume.summary}
          onChange={this.props.summaryChangeHandler}
        />

        <hr/>
        <h4>Contact Info</h4>
        <p>Email
          <FormControl
            name='email'
            type="text"
            value={
              this.props.resume.contactInfo && this.props.resume.contactInfo.email
            }
            onChange={(event) => this.props.contactChangeHandler(event, 'email')}
          />
        {/*<input
          name='email'
          type='text'
          value={
            this.props.resume.contactInfo && this.props.resume.contactInfo.email
          }
          onChange={(event) => this.props.contactChangeHandler(event, 'email')}
        />*/}
          </p>
        <p>Phone Number
          <FormControl
            name='phoneNumber'
            type="text"
            value={
              this.props.resume.contactInfo && this.props.resume.contactInfo.phoneNumber
            }
            onChange={(event) => this.props.contactChangeHandler(event, 'phoneNumber')}
          />
          {/*<input
          name='phoneNumber'
          type='text'
          value={
            this.props.resume.contactInfo && this.props.resume.contactInfo.phoneNumber
          }
          onChange={(event) => this.props.contactChangeHandler(event, 'phoneNumber')}
        />*/}
          </p>
        <p>Address
          <FormControl
            name='address'
            type="text"
            value={
              this.props.resume.contactInfo && this.props.resume.contactInfo.address
            }
            onChange={(event) => this.props.contactChangeHandler(event, 'address')}
          />
        {/*<input
          name='address'
          type='text'
          value={
            this.props.resume.contactInfo && this.props.resume.contactInfo.address
          }
          onChange={(event) => this.props.contactChangeHandler(event, 'address')}
        />*/}
          </p>
        <hr/>
        <h4>Portfolio</h4>
        <ol>{portfolio}</ol>
        <button type="button" className="btn btn-primary btn-xs" onClick={this.props.addNewProject}>Add New Project</button>
        <hr/>
        <h4>Skills</h4>
        <ol>{skills}</ol>
        <button type="button" className="btn btn-primary btn-xs" onClick={this.props.addNewSkill}>Add New Skill</button>
        <hr/>
        <h4>Experience</h4>
        <ul>{experience}</ul>
        <button type="button" className="btn btn-primary btn-xs" onClick={this.props.addNewJob}>Add New Job</button>
        <hr/>
        <h4>Education</h4>
        <ul>{education}</ul>
        <button type="button" className="btn btn-primary btn-xs" onClick={this.props.addNewSchool}>Add New School</button>
        <hr/>
        <button type="button" className="btn btn-success btn-xs" onClick={this.props.handleSubmit}>Save</button>

      </form>
    );
  }
}

export default ResumeForm;

// <textarea
//   name='summary'
//   placeholder='Type your summary here'
//   value={this.props.resume.summary}
//   onChange={this.props.summaryChangeHandler}
// />
