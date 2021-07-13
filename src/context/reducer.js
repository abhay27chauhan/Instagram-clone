export const initialState = {
    user: null,
    post: []
}

export const ACTIONS = {
    SET_USER: "set-user",
    SET_POST: "set-post"
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
        default:
            return state;
    }
}

export default reducer;