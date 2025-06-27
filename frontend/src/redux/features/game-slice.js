

const SET_GAMES = 'games/setGame';

const setGames = (games) => ({
  type: SET_GAMES,
  payload: games
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


const initialState = []

function gamesReducer(state = initialState, action) {

  switch (action.type) {
    case SET_GAMES:
      // API request will give array of games and we don't need to immutablly change, we can update the whole games
      return action.payload;
   
    default:
      return state;
  }
}

export default gamesReducer;
