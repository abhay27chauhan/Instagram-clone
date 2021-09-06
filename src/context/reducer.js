export const initialState = {
    user: null,
    post: [],
    followReqNotifications: []
}

export const ACTIONS = {
    SET_USER: "set-user",
    SET_POST: "set-post",
    SET_NOT: "set-not"
}

const reducer = (state, action) => {
    console.log("action", action);
    switch(action.type){
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case ACTIONS.SET_POST:
            return {
                ...state,
                post: action.post
            }
        case ACTIONS.SET_NOT:
            return {
                ...state,
                followReqNotifications: action.not
            }
        default:
            return state;
    }
}

export default reducer;