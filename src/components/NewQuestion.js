import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChangeOption = e => {
    this.setState({
      [e.target.name]: e.target.value
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
      toHome: true,
    })
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const { authedUser } = this.props
    if (!authedUser) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: this.props.location.pathname
        }
      }} />
    }
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3>Would you rather...</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <textarea 
              name="optionOne"
              placeholder="Your first option"
              value={optionOne}
              onChange={this.handleChangeOptionOne}
            />
            <div>or</div>
            <textarea 
              name="optionTwo"
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

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);