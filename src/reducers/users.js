import { RECEIVE_USERS, UPDATE_USER_ANSWER, UPDATE_USER_QUESTION } from '../actions/users'

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS: 
      return {
        ...state,
        ...action.users,
      }
    case UPDATE_USER_ANSWER: 
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          answers: {
            ...state[action.user].answers,
            [action.id]: action.answer
          }
        }       
      }
    case UPDATE_USER_QUESTION: 
      return {
        ...state,
        [action.user]: {
          ...state[action.user],
          questions: state[action.user].questions.concat(action.id),
        }
      }
    default:
      return state;
  }
}

