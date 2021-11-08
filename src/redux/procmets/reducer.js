
const initialState = {
    procmet: {
        nom: "",
        code: "",
        documents: [],
        procedures: [],
        childs: [],
        parent: {},
        image: ""
    },
    procmets : [],
};
const procmetsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PROCMET':
            return{
                ...state,
                procmets: action.payload
            }
        case 'GET_ONE_PROCMET':
            return{
                ...state,
                procmet: action.payload
            }
    default: return state}}

export default procmetsReducer;