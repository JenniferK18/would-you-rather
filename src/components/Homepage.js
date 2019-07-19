import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionBrief from "./QuestionBrief";
import { Redirect } from 'react-router-dom'

class Homepage extends Component {
  state = {
    showAnsweredQuestions: false,
  }

  toggleQuestions = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        showAnsweredQuestions: !prevState.showAnsweredQuestions
      }
    })
  }

  render() {
    const { showAnsweredQuestions } = this.state
    const { authedUser } = this.props
    if (!authedUser) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <br />
        <p>Hello, {authedUser}!</p>
        <h1>Would You Rather?</h1>
        <h2>{showAnsweredQuestions ? "Your Answered Questions" : "Your Unanswered Questions"}</h2>
        <button onClick={this.toggleQuestions}>Switch to {showAnsweredQuestions ? 'unanswered' : 'answered'} questions</button>
        <ul>
          {this.props.questionIDs.map(questionID => (
            <QuestionBrief key={questionID} qid={questionID} showAnsweredQuestions={showAnsweredQuestions} />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    questionIDs: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    authedUser
  };
}

export default connect(mapStateToProps)(Homepage);
