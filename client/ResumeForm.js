import React, { Component } from 'react';
import ReactDOM from 'react-dom';

function listFuncFactory (itemConverter) {
  /*
    creates functions that make different kinds of lists
    used to adapt with lists of simple strings or job info
  */
  return (list) => list.map(itemConverter);
}

const createStringList = listFuncFactory(
  /*
    creates a list for string items,
    i.e. skills and portfolio links
  */
  (item, i) => <li key={i}>{item}</li>
);

const createJobList = listFuncFactory(
  /*
    creates div for job info
  */
  (job, i) => {
    return (
      <div key={i}>
        <h4>{job.company}, {job.title}</h4>
        <p>{job.start} - {job.end}</p>
        <p>{job.location}</p>
        <p>{job.content}</p>
      </div>
    )
  }
);

// const createEducation = listFuncFactory(
//   /*
//     creates div for job info
//   */
//   (school, i) => {
//     return (
//       <div key={i}>
//         <h4>{school.school}, {job.title}</h4>
//         <p>{job.start} - {job.end}</p>
//         <p>{job.location}</p>
//         <p>{job.content}</p>
//       </div>
//     )
//   }
// );

class ResumeForm extends Component {
  /*
    Form to send resume data to server
  */
  constructor(props) {
    super(props);
    this.state = {
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
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // TODO: post data to server 
    console.log('submitted');
  }

  render() {

    const portfolio = createStringList(this.state.portfolio);
    const skills = createStringList(this.state.skills);
    const experience = createJobList(this.state.experience);

    return (
      <form onSubmit={this.handleSubmit}>
        
        <h3>Summary</h3>
        <input type='text' name='summary' placeholder='Type your summary here' />

        <h3>Portfolio</h3>
        <ul>{portfolio}</ul>
        
        <h3>Skills</h3>
        <ul>{skills}</ul>

        <h3>Experience</h3>
        <ul>{experience}</ul>

        <h3>Education</h3>

      
        <button>Save</button>
      </form>
    );
  }
}

export default ResumeForm;