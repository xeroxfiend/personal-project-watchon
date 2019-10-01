import {createStore} from "redux";

//initial state
const initialState = {
  searchInput: "",
  userId: null,
  userEmail: ""
};

//action constants
export const UPDATE_SEARCH_STATE = "UPDATE_SEARCH_STATE";
export const ADD_USER = "ADD_USER";

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_STATE:
      return {...state, searchInput: action.payload};
    case ADD_USER:
      return {
        ...state,
        userId: action.payload.userId,
        userEmail: action.payload.userEmail
      };
    default:
      return state;
  }
}

export default createStore(reducer);
