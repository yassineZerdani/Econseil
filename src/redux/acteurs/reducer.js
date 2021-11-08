
const initialState = {
    acteur : {
        nom: "",
        type: "",
        email: "",
        description: "",
        operations: [],
        procedures: [],
        childs: [],
        parent: {},
        profile: ""
    },
    acteurs : [],
    acteurs_attached : []
};
const actorsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_ACTORS':
            return{
                ...state,
                acteurs: action.payload
            }
        case 'GET_ACTOR':
            return{
                ...state,
                acteur: action.payload
            }
        case 'GET_SUB_ACTORS':
            return{
                ...state,
                acteurs_attached: action.payload
            }
    default: return state}}

export default actorsReducer;