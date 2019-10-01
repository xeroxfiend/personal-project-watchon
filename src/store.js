import {createStore} from "redux";

//initial state

const initialState = {
  searchInput: ""
};

//action constants

// export const something

//reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default createStore(reducer);
