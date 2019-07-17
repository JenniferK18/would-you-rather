import { 
  RECEIVE_QUESTIONS, 
  CHOOSE_ANSWER, 
  REMOVE_ANSWER,
  ADD_QUESTION
} from '../actions/questions'

export default function questions(state = {}, action) {

  switch(action.type) {
    case RECEIVE_QUESTIONS: 
      return {
        ...state,
        ...action.questions
      }
    case CHOOSE_ANSWER: 
      return {
        ...state,
        [action.qid]: state[action.qid] && {
          ...state[action.qid],
          optionOne: action.isOptionOne
            ? {
              ...state[action.qid]['optionOne'],
              votes: state[action.qid]['optionOne'].votes.concat(action.authedUser)
            }
            : { ...state[action.qid]['optionOne'], }
          ,
          optionTwo: !action.isOptionOne
          ? {
            ...state[action.qid]['optionTwo'],
            votes: state[action.qid]['optionTwo'].votes.concat(action.authedUser)
          }
          : { ...state[action.qid]['optionTwo'], }
        }
    }
    case REMOVE_ANSWER: 
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionOne: action.isOptionOne
            ? { ...state[action.qid]['optionOne'],
              votes: state[action.qid]['optionOne'].votes.filter(id => id !== action.authedUser)
            }
            : { ...state[action.qid]['optionOne'], },
          optionTwo: !action.isOptionOne 
          ? {
            ...state[action.qid]['optionTwo'],
            votes: state[action.qid]['optionTwo'].votes.filter(id => id !== action.authedUser)
          }
          : { ...state[action.qid]['optionTwo'], },
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      }
    default:
      return state;
  }
}

