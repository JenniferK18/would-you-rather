import React, { Component } from "react";
import { connect } from "react-redux";
import User from './User'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
  render() {
    const { authedUser, userIDs } = this.props
    if (!authedUser) {
      return <Redirect to='/login' />
    }
    return (
      <div>
        <h1>Leaderboard</h1>
        <ul>
          {userIDs.map(userID => 
            <li key={ userID }>
              <User userID={ userID }/>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    userIDs: Object.keys(users).sort(
      (a, b) => {
        const userB = Object.keys(users[b].answers).length + users[b].questions.length
        const userA = Object.keys(users[a].answers).length + users[a].questions.length
        return userB - userA
      }
    ),
    authedUser
  };
}
  
export default connect(mapStateToProps)(Leaderboard);
  