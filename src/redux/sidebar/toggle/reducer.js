
const initialState = {
    toggle : true,
};
const sidebarToggleReducer = (state = initialState, action) => {
    switch(action.type){
        case 'TOGGLE':
            return{
                ...state,
                toggle: action.payload
            }
    default: return state}}

export default sidebarToggleReducer;