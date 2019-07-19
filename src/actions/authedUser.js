export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function handleSetAuthedUser(id) {
  return (dispatch) => {
    dispatch(setAuthedUser(id))
  }
}

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  }
}