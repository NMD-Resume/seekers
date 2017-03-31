import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ResumeForm extends Component {
  /*
    Form to send resume data to server
  */
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitted');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='summary' placeholder='Summary' />
        <button>Save</button>
      </form>
    );
  }
}

export default ResumeForm;