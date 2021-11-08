
const initialState = {
    operations : [],
    operation: {
        nom: "",
        procedure: {nom: "", id: ""},
        type: "",
        acteurs: [],
        documents: [],
        description: ""
    },
    operation_acteurs : [],
};
const opReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_OPERATIONS':
            return{
                ...state,
                operations: action.payload
            }
        case 'GET_OPERATION':
            return{
                ...state,
                operation: action.payload
            }
        case 'GET_OPERATION_ACTORS':
            return{
                ...state,
                operation_acteurs: action.payload
            }
    default: return state}}

export default opReducer;