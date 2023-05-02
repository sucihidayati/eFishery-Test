import intialState from "./state";

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_FISH":
      return {
        ...state,
        fishData: action.data,
      };
    case "ADD_FISH":
      return {
        ...state,
        fishData: state.fishData.concat(action.data),
      };
    default:
      return state;
  }
};

export default reducer;
