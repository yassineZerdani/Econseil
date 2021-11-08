
const initialState = {
    diagramme : [],
};
const diagReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_DIAG':
            return{
                ...state,
                diagramme: action.payload
            }
    default: return state}}

export default diagReducer;