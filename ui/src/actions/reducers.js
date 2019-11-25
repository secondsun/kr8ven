import { INCOMING_REPOSITORIES } from './action_types'
import { combineReducers } from "redux";

function repositories(state = [], action) {
    switch(action.type) {
        case INCOMING_REPOSITORIES:
        const posts = action.payload;
        return posts;
    default:
      return state;
    }
}

export default combineReducers({repositories});
