
const initialState = {
    procorgs : [],
};
const procedureReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PROCEDURES':
            return{
                ...state,
                procorgs: action.payload
            }
    default: return state}}

export default procedureReducer;