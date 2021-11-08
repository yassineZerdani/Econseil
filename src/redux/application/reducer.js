
const initialState = {
    application : [],
};
const appReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_APP':
            return{
                ...state,
                application: action.payload
            }
    default: return state}}

export default appReducer;