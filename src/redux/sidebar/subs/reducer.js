
const initialState = {
    is_sub_collapsed : [false, false, false, false, false],
};
const subReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS_SUB_COLLAPSED':
            return{
                ...state,
                is_sub_collapsed: action.payload
            }
        case 'COLLAPSE':
            return{
                ...state,
                is_sub_collapsed: action.payload
            }
    default: return state}}

export default subReducer;