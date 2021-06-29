export const initialState = {
    user: null,
}

export const ACTIONS = {
    SET_USER: "set-user",
}

const reducer = (state, action) => {
    console.log("action", action);
    switch(action.type){
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}

export default reducer;