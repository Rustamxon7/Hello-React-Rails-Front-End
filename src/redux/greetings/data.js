const GET_GREETINGS = 'GET_GREETINGS';
const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';
const GET_GREETINGS_FAILURE = 'GET_GREETINGS_FAILURE';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GREETINGS:
      return {
        ...state,
        loading: true,
      };
    case GET_GREETINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_GREETINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getGreetings = () => ({
  type: GET_GREETINGS,
});

export const getGreetingsSuccess = (data) => ({
  type: GET_GREETINGS_SUCCESS,
  payload: data,
});

export const getGreetingsFailure = (error) => ({
  type: GET_GREETINGS_FAILURE,
  payload: error,
});

export const fetchGreetings = () => async (dispatch) => {
  dispatch(getGreetings());
  try {
    const response = await fetch('https://secret-savannah-34512.herokuapp.com/api/greeting');
    const result = await response.json();
    // get random message form result

    const data = result.map((item) => ({
      id: item.id,
      message: item.message,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    const getRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    };

    const randomMessage = getRandomMessage();
    dispatch(getGreetingsSuccess(randomMessage));
  } catch (error) {
    dispatch(getGreetingsFailure(error));
  }
};

export default reducer;
