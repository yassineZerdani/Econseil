
const initialState = {
    isactive : [true, false, false, false, false, false, false],
};
const procorgSidebarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS_PROCORG_NAV_ACTIVE':
            return{
                ...state,
                isactive: action.payload
            }
    default: return state}}

export default procorgSidebarReducer;