import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleChooseAnswer } from '../actions/questions'

class Question extends Component {

  handleVote = (e, isOptionOne) => {
    e.preventDefault()
    const { dispatch, question, authedUser } = this.props
    dispatch(handleChooseAnswer({
      authedUser,
      qid: question.id,
      isOptionOne,
      answer: isOptionOne ? 'optionOne' : 'optionTwo'
    }))
  }

  isDisabledForUser = () => {
    const { question, authedUser } = this.props
    return (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
  }

  render() {
    const { optionOne, optionTwo, author } = this.props.question
    return (
      <div>
        <h2>Would you rather...</h2>
        <button 
          onClick={ e => this.handleVote(e, true) }
          disabled={this.isDisabledForUser()}
        >
          {optionOne.text} - {optionOne.votes.length} votes
        </button>
        <p>or</p>
        <button 
          onClick={ e => this.handleVote(e, false) }
          disabled={this.isDisabledForUser()}
        >
          {optionTwo.text} - {optionTwo.votes.length} votes
        </button>
        <p>Question provided by: { author }</p>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }, { qid }) {
  const question = questions[qid]
  return {
    authedUser,
    question
  }
}
 
export default connect(mapStateToProps)(Question);