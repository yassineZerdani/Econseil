
const initialState = {
    isactive : [true, false, false, false, false],
};
const procmetSidebarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS_PROCMET_NAV_ACTIVE':
            return{
                ...state,
                isactive: action.payload
            }
    default: return state}}

export default procmetSidebarReducer;