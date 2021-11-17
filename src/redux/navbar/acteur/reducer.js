
const initialState = {
    isactive : [true, false],
};
const actorSidebarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS_ACTOR_NAV_ACTIVE':
            return{
                ...state,
                isactive: action.payload
            }
    default: return state}}

export default actorSidebarReducer;