import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
  }

  handleChangeOptionOne = e => {
    const optionOne = e.target.value;
    this.setState({
      optionOne
    })
  }
  handleChangeOptionTwo = e => {
    const optionTwo = e.target.value;
    this.setState({
      optionTwo
    })
  }
  handleSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;
    dispatch(handleAddQuestion(optionOne, optionTwo))
    this.setState({
      optionOne: '',
      optionTwo: '',
    })
  }

  render() {
    const { optionOne, optionTwo } = this.state
    return (
      <div>
        <h3>Would you rather...</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea 
              placeholder="Your first option"
              value={optionOne}
              onChange={this.handleChangeOptionOne}
            />
            <div>or</div>
            <textarea 
              placeholder="Your second option"
              value={optionTwo}
              onChange={this.handleChangeOptionTwo}
            />
          </div>
          <button 
            disabled={optionOne === '' || optionTwo === ''}
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewQuestion);