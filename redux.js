import {createStore} from 'redux';

const SAVE_USERID = "SAVE_USERID";
const SAVE_USER_PHOTO = "SAVE_USER_PHOTO";
const CHANGES_MADE = "CHANGES_MADE";

const initialState = {
    userID: "",
    profilePhotoURL: "",
    changesMade: false,
}

export const saveUserID = (uid) => ({
    type: SAVE_USERID,
    payload: {uid},
});

export const saveUserPhoto = (uri) => ({
    type: SAVE_USER_PHOTO,
    payload: {uri},
});

export const changesMade = () => ({
    type: CHANGES_MADE,
    payload: {},
});

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USERID:
            return {
                ...state,
                userID: action.payload.uid,
            }
        case SAVE_USER_PHOTO:
            console.log(action.payload.uri);
            return {
                ...state,
                profilePhotoURL: action.payload.uri,
            }
        case CHANGES_MADE:
            return {
                ...state,
                changesMade: !changesMade,
            }
        default: return state;
    }
}


const store = createStore(rootReducer);
export default store;