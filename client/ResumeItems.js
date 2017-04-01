import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/*
  Module that contains helper functions to create lists within resume page
*/

export function Job(props) {
  /*
    creates div for job info
  */
  const job = props.job;
  return (
    <div>
      <h4>{job.company}, {job.title}</h4>
      <p>{job.start} - {job.end}</p>
      <p>{job.location}</p>
      <p>{job.content}</p>
    </div>
  );
}

function captionedInput(caption, value, propChangeHandler) {
  // using the change handler originating from the resume container
  return (
    <p key={caption}>{caption}
      <input
        type='text'
        value={value}
        onChange={propChangeHandler}
      />
    </p>
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
    const job = this.props.job;
    // creates parameter list to create a captioned input with a handler
    // bound to the ResumeContainer
    const inputs = [
      ['Title', job.title, this.createJobChangeHandler('title')],
      ['Company', job.company, this.createJobChangeHandler('company')],
      ['Start', job.start, this.createJobChangeHandler('start')],
      ['End', job.end, this.createJobChangeHandler('end')],
      ['Location', job.location, this.createJobChangeHandler('location')],
      ['Content', job.content, this.createJobChangeHandler('content')],
    ]
      .map(params => captionedInput(...params));

    return (
      <div>
        {inputs}
      </div>
    );
  }
}

export function School(props) {
  /*
    creates div for school/education info
  */
  const school = props.school;
  return (
    <div>
      <h4>{school.school} - {school.major}, {school.degree}</h4>
      <p>{school.start} - {school.end}</p>
      <p>{school.location}</p>
    </div>
  )
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
    const job = this.props.job;
    // creates parameter list to create a captioned input with a handler
    // bound to the ResumeContainer
    const inputs = [
      ['School', job.title, this.createChangeHandler('school')],
    ]
      .map(params => captionedInput(...params));

    return (
      <div>
        {inputs}
      </div>
    );
  }
}