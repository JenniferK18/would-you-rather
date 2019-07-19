import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class QuestionBrief extends Component {

  isDisabledForUser = () => {
    const { question, authedUser } = this.props
    return (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser))
  }

  render() {
    const { author, optionOne, id } = this.props.question
    const { showAnsweredQuestions } = this.props
    return (
      ((showAnsweredQuestions && this.isDisabledForUser()) || (!showAnsweredQuestions && !this.isDisabledForUser())) &&
        <li>
          <div>
            <h2>Would you rather...</h2>
            <p>
              {optionOne.text} or...
            </p>
            <p>Question provided by: { author }</p>
            <Link to={`/questions/${id}`}>See more</Link>
          </div>
        </li>
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
 
export default withRouter(connect(mapStateToProps)(QuestionBrief));