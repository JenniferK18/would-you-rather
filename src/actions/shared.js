import { _getQuestions, _getUsers } from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'

export function handleInitialData() {
  return (dispatch) => {
    _getQuestions().then((questions) => {
      dispatch(receiveQuestions(questions))
    })
    _getUsers().then((users) => {
      dispatch(receiveUsers(users))
    })
  }
}