
const initialState = {
    isactive : [true, false, false, false, false],
};
const sidebarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS_ACTIVE':
            return{
                ...state,
                isactive: action.payload
            }
    default: return state}}

export default sidebarReducer;