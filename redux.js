import {createStore} from 'redux';

const SAVE_USERID = "SAVE_USERID";

const initialState = {
    userID: "",
}

export const saveUserID = (uid) => ({
    type: SAVE_USERID,
    payload: {uid},
});

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USERID:
            return {
                ...state,
                userID: action.payload.uid,
            }
        default: return state;
    }
}


const store = createStore(rootReducer);
export default store;