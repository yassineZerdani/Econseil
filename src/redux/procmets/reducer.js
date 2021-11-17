
const initialState = {
    procmets : [],
};
const procmetsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PROCMET':
            return{
                ...state,
                procmets: action.payload
            }
    default: return state}}

export default procmetsReducer;