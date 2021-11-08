
const initialState = {
    vueensemble : [],
};
const vueensReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_VUE_ENSEMBLE':
            return{
                ...state,
                vueensemble: action.payload
            }
    default: return state}}

export default vueensReducer;