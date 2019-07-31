import React from 'react'
import { connect } from 'react-redux'

const User = () => {
  const { user } = this.props
  console.log('user: ', user)
  const questionsAsked = user.questions.length
  const questionsAnswered = Object.keys(user.answers).length
  return (
    <div>
      <div>{ user.name }</div>
      <div>
        <img 
          src={user.avatarURL}
          alt="Avatar"
          height={100}
          width={100}
        />
      </div>
      <div>Questions asked: { questionsAsked }</div>
      <div>Questions answered: { questionsAnswered }</div>
      <div>Total score: { questionsAsked + questionsAnswered }</div>
    </div>
  );  
}

function mapStateToProps({ users }, { userID }) {
  const user = users[userID]
  return {
    user
  }
}
 
export default connect(mapStateToProps)(User);