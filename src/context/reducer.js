export const initialState = {
    user: null,
}

export const ACTIONS = {
    SET_USER: "set-user",
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case state.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}

export default reducer;