import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Homepage extends Component {
  render() {
    return (
      <div>
        <h1>Would You Rather?</h1>
        <ul>
          {this.props.questionIDs.map(questionID => (
          <li key={questionID}>
            <Question qid={questionID} />
          </li>
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
