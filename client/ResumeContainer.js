/*
  Container for either resume editing or displaying
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResumeForm from './ResumeForm';
import ResumeDisplay from './ResumeDisplay';
import fetch from 'isomorphic-fetch';

let user;
let editing = false;

//Checks to see if client was routed from signup page
if (window.location.pathname.substring(0,8) === '/newuser') {
    //Slices off the username from the URL and allows immediate access to editing
    user = window.location.pathname.slice(9);
    editing = true;
} else {
    //Slices off the username from the URL
    user = window.location.pathname.slice(6);
}

const getResumeUrl = 'http://localhost:3000/seek/' + user;
const patchResumeUrl = 'http://localhost:3000/seek/' + user;

class ResumeContainer extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
    };
    
  }

  componentWillMount() {
    // before component mounts, start a GET request for resume data
    if (editing) {
      this.setState({
        editing: true,
      })
    }


    // function to bind setState to the component during async function
    const setResume = (resume) => this.setState.call(this, { resume });

    // makes request and gets resume json data
    (async function () {
      const res = await fetch(getResumeUrl);
      const resumeData = await res.json();

      // remove _id since unnecessary
      // as well as to avoid Mongoose error that occurs 
      // when trying to update that property
      // delete resumeData._id;

      setResume(resumeData);
    })();
  }

  /**
   * onChange handlers passed down to inputs
   */
  summaryChangeHandler(event) {
    // replaces the summary property in the state.resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { summary: event.target.value });
    this.setState({
      resume: newResume
    });
  }

  contactChangeHandler(event, contactProp) {
    // copy contact object
    const newContacts = Object.assign({}, this.state.resume.contactInfo);

    // then change the property in the experience at the given index
    newContacts[contactProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { contactInfo: newContacts });

    this.setState({
      resume: newResume
    });
  }

  portfolioChangeHandler(event, index, projectProp) {
    // copy portfolio array
    const newLinks = this.state.resume.portfolio.slice();

    // then change the property in the experience at the given index
    newLinks[index][projectProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { portfolio: newLinks });

    this.setState({
      resume: newResume
    });
  }

  skillsChangeHandler(event, index) {
    // copy experience array
    const newSkills = this.state.resume.skills.slice();

    // then change the property in the experience at the given index
    newSkills[index] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { skills: newSkills });

    this.setState({
      resume: newResume
    });
  }

  experienceChangeHandler(event, index, jobProp) {
    // copy experience array
    const newExperience = this.state.resume.experience.slice();

    // then change the property in the experience at the given index
    newExperience[index][jobProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { experience: newExperience });

    this.setState({
      resume: newResume
    });
  }

  educationChangeHandler(event, index, jobProp) {
    // copy education array
    const newEducation = this.state.resume.education.slice();

    // then change the property in the education at the given index
    newEducation[index][jobProp] = event.target.value;

    // create updated copy of resume object
    const newResume = {};
    Object.assign(newResume, this.state.resume, { education: newEducation });

    this.setState({
      resume: newResume
    });
  }

  /**
   * New resume item button handlers
   * Will add fresh dummy entries into each resume section
   */
  createAddNewFunc(item, targetArr) {
    /**
     * Creates a function to add an array in this.state.resume object
     * item - new item inside a resume section
     * targetArr - key of the array to change within this.state.resume
     */
    return () => {
      // throw err if targetArr not in this.state.resume
      if (!this.state.resume[targetArr])
        throw new Error('Invalid resume key. Choose a key mapped to an array.');

      const newArr = this.state.resume[targetArr].concat(item);

      // new resume w/ updated arr
      const newResume = Object.assign({}, this.state.resume,
        { [targetArr]: newArr }
      );

      // then change state
      this.setState({ resume: newResume });
    }
  }
  
  addNewProject() {
    // run function returned by createAddNewFunc
    (
      this.createAddNewFunc({}, 'portfolio')
    )();
  }
  
  addNewSkill() {
    // run function returned by createAddNewFunc
    (
      this.createAddNewFunc('', 'skills')
    )();
  }

  addNewJob() {
    // run function returned by createAddNewFunc
    (
      this.createAddNewFunc({}, 'experience')
    )();
  }

  addNewSchool() {
    // run function returned by createAddNewFunc
    (
      this.createAddNewFunc({}, 'education')
    )();
  }

  /**
   * Item removal handlers
   * Will remove items in given array
   */
  createRemoveFunc(targetIdx, targetArr) {
    /**
     * Creates a function to remove from an array in this.state.resume object
     * targetIdx - index of item to remove in targetArr
     * targetArr - key of the array to change within this.state.resume
     */
    return () => {
      // throw err if targetArr not in this.state.resume
      if (!this.state.resume[targetArr])
        throw new Error('Invalid resume key. Choose a key mapped to an array.');

      // create new arr without item at targetIdx
      const newArr = this.state.resume[targetArr]
        .filter((_, idx) => idx !== targetIdx);

      // new resume w/ updated arr
      const newResume = Object.assign({}, this.state.resume,
        { [targetArr]: newArr }
      );

      // then change state
      this.setState({ resume: newResume });
    }
  }

  removeProject(targetIdx) {
    // run function returned by createRemoveFunc
    (
      this.createRemoveFunc(targetIdx, 'portfolio')
    )();
  }
  
  removeSkill(targetIdx) {
    // run function returned by createRemoveFunc
    (
      this.createRemoveFunc(targetIdx, 'skills')
    )();
  }

  removeJob(targetIdx) {
    // run function returned by createRemoveFunc
    (
      this.createRemoveFunc(targetIdx, 'experience')
    )();
  }

  removeSchool(targetIdx) {
    // run function returned by createRemoveFunc
    (
      this.createRemoveFunc(targetIdx, 'education')
    )();
  }

  /**
   * Submits data to database
   * @param {Event} e - event object 
   */
  handleSubmit(e) {
    // prevent refresh
    e.preventDefault();

    // for node-fetch requests,
    // need to convert json body to a query string (e.g. "name=dude&key=value")
    // using query-string's stringify method
    // const body = queryStr.stringify(this.state.resume);

    // function to bind setState to the component during async function
    const boundSetState = this.setState.bind(this);
    const body = JSON.stringify(this.state.resume);

    // make a patch request to update the current resume
    (async function () {
      try {
        const res = await fetch(patchResumeUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body,
        });
        const result = await res.json();

        // indicate data has been saved
        console.log('Data saved');
        
        // redirect to public facing resume
        window.location.replace('/user/' + user);
      } catch (err) {
        // Do something with an error, either with a failed
        // patch request or a database error
        
        // indicate error in saving data
        console.log('Error saving data')
      }
    })();
  }

  render() {
    // becomes a form if a logged in user wants to edit their resume
    // if not editing, will display a public-facing resume
    // passes input change and new item handlers
    const resumePage = (this.state.editing) ?
      <ResumeForm
        resume={this.state.resume}

        summaryChangeHandler={this.summaryChangeHandler.bind(this)}
        contactChangeHandler={this.contactChangeHandler.bind(this)}
        experienceChangeHandler={this.experienceChangeHandler.bind(this)}
        educationChangeHandler={this.educationChangeHandler.bind(this)}
        skillsChangeHandler={this.skillsChangeHandler.bind(this)}
        portfolioChangeHandler={this.portfolioChangeHandler.bind(this)}

        addNewProject={this.addNewProject.bind(this)}
        addNewSkill={this.addNewSkill.bind(this)}
        addNewJob={this.addNewJob.bind(this)}
        addNewSchool={this.addNewSchool.bind(this)}

        removeProject={this.removeProject.bind(this)}
        removeSkill={this.removeSkill.bind(this)}
        removeJob={this.removeJob.bind(this)}
        removeSchool={this.removeSchool.bind(this)}

        handleSubmit={this.handleSubmit.bind(this)}
      />
      :
      <ResumeDisplay resume={this.state.resume} />;

    return (
      <div>
        {
          (this.state.resume)
            ?
            resumePage
            :
            <p>Loading resume...</p>
        }
      </div>
    )
  }
}

export default ResumeContainer;