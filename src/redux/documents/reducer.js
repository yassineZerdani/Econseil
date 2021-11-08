
const initialState = {
    documents : [],
};
const docsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_DOCS':
            return{
                ...state,
                documents: action.payload
            }
    default: return state}}

export default docsReducer;