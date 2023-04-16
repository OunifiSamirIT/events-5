import { SET_EVENT, DELETE_EVENT } from "../types";

const intitialState = {
  events: [],
 
};
export default function (state = intitialState, action) {
  switch (action.type) {
    
    case SET_EVENT:
      return {
        ...state,
        events: action.payload,
      };
      case DELETE_EVENT:
        return {
          ...state,
          events: state.events.filter(p =>p._id !== action.payload),
        };  

    default:
      return state;
  }
}
