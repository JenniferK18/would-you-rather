import React, { Component } from "react";
import { connect } from "react-redux";
import User from './User'

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {this.props.userIDs.map(userID => 
            <li key={ userID }>
              <User userID={ userID }/>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    userIDs: Object.keys(users).sort(
      (a, b) => {
        const userB = Object.keys(users[b].answers).length + users[b].questions.length
        const userA = Object.keys(users[a].answers).length + users[a].questions.length
        return userB - userA
      }
    )
  };
}
  
export default connect(mapStateToProps)(Leaderboard);
  