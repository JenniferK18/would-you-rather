import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleChooseAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
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

  userHasAnswered = () => {
    const { question, authedUser } = this.props
    return (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
  }

  render() {
    const { users, authedUser, question } = this.props
    if (!authedUser) {
      return <Redirect to={{
        pathname: '/login',
        state: {
          redirectError: true,
        }
      }} />
    }
    const { optionOne, optionTwo, author } = question
    return (
      <div>
        <h2>Would you rather...</h2>
        <button 
          onClick={ e => this.handleVote(e, true) }
          disabled={this.userHasAnswered()}
        >
          {optionOne.text}
        </button>
        { this.userHasAnswered() && 
          <Fragment>
            <span>
              {`   ${optionOne.votes.length} vote(s), ${(optionOne.votes.length / (optionOne.votes.length + optionTwo.votes.length) * 100).toFixed(2)}%`}
            </span>
            { optionOne.votes.includes(authedUser) && <div>You voted for this option.</div> }
          </Fragment>
        }
        <p>or</p>
        <button 
          onClick={ e => this.handleVote(e, false) }
          disabled={this.userHasAnswered()}
        >
          {optionTwo.text}
        </button>
        { this.userHasAnswered() && 
          <Fragment>
            <span>
              {`   ${optionTwo.votes.length} vote(s), ${(optionTwo.votes.length / (optionTwo.votes.length + optionOne.votes.length) * 100).toFixed(2)}%`}
            </span>
            { optionTwo.votes.includes(authedUser) && <div>You voted for this option.</div> }
          </Fragment>
        }
        <p>Question provided by: { author }</p>
        <img 
            src={users[author].avatarURL}
            alt="Avatar"
            height={100}
            width={100}
          />
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  return {
    authedUser,
    question,
    users
  }
}
 
export default connect(mapStateToProps)(Question);