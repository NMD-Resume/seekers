import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ResumeForm extends Component {
  /*
    Form to send resume data to server
  */
  constructor(props) {
    super(props);
    this.state = {
      summary: 'Summary',
      portfolio: ['https://google.com', 'https://linkedin.com'],
      skills: ['React', 'Mongo', 'Baking'],
      experience: [
        {
          start: 'Beginning of time',
          end: 'End of time',
          content: 'Big Pimpin\'',
          location: 'Errwhere, USA',
        }
      ],
      education: [
        {
          start: 'now',
          end: 'the future',
          content: 'Codesmith Academy for People Who Code Good',
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

    const portfolio = this.state.portfolio.map(link => {
      <iframe src={link} key={link} />
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='summary' placeholder='Summary' />
        <iframe src='http://exercism.io/' />
        <button>Save</button>
      </form>
    );
  }
}

export default ResumeForm;