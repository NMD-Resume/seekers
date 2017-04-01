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

function captionedInput(caption, value) {
  return <p>{caption}<input type='text' value={value}/></p>;
}

export function JobInput(props) {
  /*
    creates inputs for diff resume elems
  */
  const job = props.job;
  const inputs = [
    captionedInput('Title', job.title),
    captionedInput('Company', job.company),
    captionedInput('Start', job.start),
    captionedInput('End', job.end),
    captionedInput('Location', job.location),
    captionedInput('Details', job.content),
  ];
  return (
    <div>
      {inputs}
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
      <h4>{school.school} - {school.major}, {school.degree}</h4>
      <p>{school.start} - {school.end}</p>
      <p>{school.location}</p>
    </div>
  )
}