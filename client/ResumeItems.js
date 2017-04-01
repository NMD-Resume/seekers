import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Forms, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

/*
  Components for items within each resume section
*/

export function Job(props) {
  /*
    creates div for job info
  */
  const job = props.job;
  return (
    <div>
      <h5>{job.company}, {job.title}</h5>
      <p>{job.start} - {job.end}</p>
      <p>{job.location}</p>
      <p>{job.content}</p>
    </div>
  );
}

export function School(props) {
  /*
    creates div for school/education info
  */
  const school = props.school;
  return (
    <div>
      <h5>{school.school} - {school.major}, {school.degree}</h5>
      <p>{school.start} - {school.end}</p>
      <p>{school.location}</p>
    </div>
  )
}

// creates a combination of an input and describing text next to it
function captionedInput(caption, value, propChangeHandler) {
  const input = (
    <FormControl
      type="text"
      value={value}
      onChange={propChangeHandler}
    />
   /*<input
        type='text'
        value={value}
        onChange={propChangeHandler}
      />*/
  );
  // onChange uses the change handler originating from the resume container
  return (
    <p key={caption}>{caption} {input}</p>
  );
}

export class JobInput extends Component {

  createJobChangeHandler(jobProp) {
    // creates specific event handlers for a specific field in a job
    return (event) => this.props.experienceChangeHandler(event, this.props.index, jobProp);
  }

  render() {
    /*
      creates inputs for diff resume elems
    */
    // creates parameter list to create a captioned input with a handler
    // bound to the ResumeContainer
    const inputs = [
      ['Title', this.props.job.title, this.createJobChangeHandler('title')],
      ['Company', this.props.job.company, this.createJobChangeHandler('company')],
      ['Start', this.props.job.start, this.createJobChangeHandler('start')],
      ['End', this.props.job.end, this.createJobChangeHandler('end')],
      ['Location', this.props.job.location, this.createJobChangeHandler('location')],
      ['Content', this.props.job.content, this.createJobChangeHandler('content')],
    ]
      .map(params => captionedInput(...params));

    return (
      <div>
        {inputs}
        <button type="button" className="btn btn-danger btn-xs" onClick={() => this.props.removeJob(index)}>Remove Job</button>
      </div>
    );
  }
}

export class SchoolInput extends Component {

  createSchoolChangeHandler(jobProp) {
    // creates specific event handlers for a specific field in a job
    return (event) => this.props.educationChangeHandler(event, this.props.index, jobProp);
  }

  render() {
    /*
      creates inputs for diff resume elems
    */
    // creates parameter list to create a captioned input with a handler
    // bound to the ResumeContainer
    const inputs = [
      ['School', this.props.school.school, this.createSchoolChangeHandler('school')],
      ['Major', this.props.school.major, this.createSchoolChangeHandler('major')],
      ['Degree', this.props.school.degree, this.createSchoolChangeHandler('degree')],
      ['Start', this.props.school.start, this.createSchoolChangeHandler('start')],
      ['End', this.props.school.end, this.createSchoolChangeHandler('end')],
      ['Location', this.props.school.location, this.createSchoolChangeHandler('location')],
    ]
      .map(params => captionedInput(...params));

    return (
      <div>
        {inputs}
        <button type="button" className="btn btn-danger btn-xs" onClick={() => this.props.removeSchool(index)}>x</button>
      </div>
    );
  }
}
/*<input
  type='button'
  value='Remove Job'
  onClick={() => this.props.removeJob(this.props.index)}
/>*/
/*<input
  type='button'
  value='Remove School'
  onClick={() => this.props.removeSchool(this.props.index)}
/>*/
