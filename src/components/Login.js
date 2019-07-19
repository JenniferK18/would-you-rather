import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {
    currentUser: this.props.userIDs[0],
    toHome: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleSetAuthedUser(null))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.userIDs[0],
    })
  }

  logInUser = (event) => {
    event.preventDefault();
    const { dispatch } = this.props
    const { currentUser } = this.state
    dispatch(handleSetAuthedUser(currentUser))
    this.setState({
      toHome: true,
    })
  }

  handleSelect = (event) => {
    this.setState({
      currentUser: event.target.value
    })
  }

  render() {
    const { currentUser, toHome } = this.state
    const { userIDs } = this.props

    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h3>You are logged out. Please log in.</h3>
        <form onSubmit={this.logInUser}>
          <select value={currentUser} onChange={(e) => this.handleSelect(e)}>
            {userIDs.map(userID => 
              <option key={userID} value={userID}>{userID}</option>
            )}
          </select>
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    userIDs: Object.keys(users),
    authedUser
  }
}
 
export default connect(mapStateToProps)(Login);