
const initialState = {
    is_sidebar_active : [true, false, false, false, false],
};
const sidebarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS_SIDEBAR_ACTIVE':
            return{
                ...state,
                is_sidebar_active: action.payload
            }
    default: return state}}

export default sidebarReducer;