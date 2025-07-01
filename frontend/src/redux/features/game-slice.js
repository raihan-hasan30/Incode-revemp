const SET_GAMES = 'games/setGame';
const ADD_GAMES = 'games/addGame';
const DELETE_GAME = "games/deleteGame"

const setGames = (games) => ({
  type: SET_GAMES,
  payload: games
});

const deleteGame = (gameId) => ({
  type: DELETE_GAME,
  payload : gameId
})

export const addGame = (game) => ({
  type: ADD_GAMES,
  payload: game
});

export const thunkFetchGames = ()  => async (dispatch) => {
  try {
    const response = await fetch("/api/game");

    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        throw response;
      }
      dispatch(setGames(data));
    } else {
      throw response;
    }
  } catch (e) {
    return e
  }

};


export const thunkDeleteGame = (id) => async (dispatch) => {
  try {
    const response = await fetch("/api/game/" + id , {
      method : "DELETE"
    });

    if (response.ok) {
      const data = await response.json();
      if (data.errors) {
        throw response;
      }
      dispatch(deleteGame(id));
    } else {
      throw response;
    }
  } catch (e) {
    return e
  }
}

const initialState = []

function gamesReducer(state = initialState, action) {

  switch (action.type) {
    case SET_GAMES:
      return action.payload;

    case DELETE_GAME:
      const newState = state.filter(i => i.id != action.payload)
      console.log("Game Deleted", newState, action)
      return newState;

    case ADD_GAMES:
      return [...state, action.payload];
   
    default:
      return state;
  }
}

export default gamesReducer;
