
export const isActive = (n) => async dispatch => {

    let is_sidebar_active = [false, false, false, false, false];

    for(let i = 0; i < 5; i++){

        if(i+1 === n){
            
            is_sidebar_active[i] = true;
        }

        else{

            is_sidebar_active[i] = false;
        }

    }
    

    dispatch(
        {
            type: 'IS_SIDEBAR_ACTIVE',
            payload: is_sidebar_active
        }
    );

}