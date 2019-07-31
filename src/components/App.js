import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Homepage from './Homepage'
import NewQuestion from './NewQuestion'
import Navigation from './Navigation'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Question from './Question'
import ErrorScreen from './ErrorScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navigation />
          <Route path='/' exact component={ Homepage } />
          <Route path='/login' component={ Login } />
          <Route path='/questions/:id' component={ Question } />
          <Route path='/add' component={ NewQuestion } />
          <Route path='/leaderboard' component={ Leaderboard } />
          <Route path='/error' component={ ErrorScreen } />
        </Fragment>
      </Router>
    );
  }
}

export default connect()(App);
