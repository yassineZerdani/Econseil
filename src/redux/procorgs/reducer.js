
const initialState = {
    procorgs : [],
    procorg : {
        code: "",
        da: "",
        date: "",
        documents: [],
        image: "",
        nom: "",
        objet: "",
        operations: [],
        processus: {id: '', nom: ''},
        terminologie: ""
    }
};
const procedureReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_PROCEDURES':
            return{
                ...state,
                procorgs: action.payload
            }
        case 'GET_PROCEDURE':
            return{
                ...state,
                procorg: action.payload
            }
    default: return state}}

export default procedureReducer;