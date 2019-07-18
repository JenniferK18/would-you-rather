import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

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
    return (
      <div>
        <h1>Would You Rather?</h1>
        <h2>{showAnsweredQuestions ? "Your Answered Questions" : "Your Unanswered Questions"}</h2>
        <button onClick={this.toggleQuestions}>Switch to {showAnsweredQuestions ? 'unanswered' : 'answered'} questions</button>
        <ul>
          {this.props.questionIDs.map(questionID => (
            <Question key={questionID} qid={questionID} showAnsweredQuestions={showAnsweredQuestions} />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  console.log('questions: ', questions)
  return {
    questionIDs: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Homepage);
