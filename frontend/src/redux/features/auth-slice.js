const initialState = {}

// Action Creators
const ADD_USER_DATA = 'auth/serUser';
const REMOVE_USER = 'auth/removeUser'

// Actions
const addUser = (obj) => ({ type: ADD_USER_DATA, payload : obj });
const removeUser = (obj) => ({ type: REMOVE_USER, payload: obj });


export default function authReducer(state =initialState, action){
  switch(action.type){
    case ADD_USER_DATA:
      return action.payload
    
    case REMOVE_USER:
      return {}

    default:
      return state
  }
}


// Thunks 
export const loginThunk = (data) => (dispatch) => {
  const { email, password} = data;

  return fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const response = await res.json()
        throw new Error(response?.error || "Something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      if (data?.message == "success") {
        dispatch(addUser(data.user))
        return data.user
      }

      if(data?.error){
        throw data.error
      }

      return false
    });
}

export const registerThunk = (data) => (dispatch) => {

  return fetch("/api/user/create-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (!res.ok) {
        const response = await res.json()
        throw new Error(response?.error || "Something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      if (data?.message == "success") {
        dispatch(addUser(data.user))
        return data.user
      }

      if (data?.error) {
        throw data.error
      }

      return false
    });
}