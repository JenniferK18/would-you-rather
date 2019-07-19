import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const CHOOSE_ANSWER = 'CHOOSE_ANSWER'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }).then(question => dispatch(addQuestion(question)))
  }
}

export function handleChooseAnswer(info) {
  return (dispatch) => {
    dispatch(chooseAnswer(info))
    return _saveQuestionAnswer(info)
    .catch((e) => {
      console.warn('Error in handleChooseAnswer: ', e)
      dispatch(removeAnswer(info))
      alert('There was an error saving your answer. Please try again.')
    })
  }
}

export function chooseAnswer({ authedUser, qid, isOptionOne, answer }) {
  return {
    type: CHOOSE_ANSWER,
    authedUser, 
    qid,
    isOptionOne,
    answer
  }
}

export function removeAnswer({ authedUser, qid, isOptionOne, answer }) {
  return {
    type: REMOVE_ANSWER,
    authedUser, 
    qid,
    isOptionOne,
    answer
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}