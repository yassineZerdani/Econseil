
export const isActive = (n) => async dispatch => {

    let isactive = [false, false, false, false, false, false, false];

    for(let i = 0; i < 7; i++){

        if(i+1 === n){
            
            isactive[i] = true;
        }

        else{

            isactive[i] = false;
        }

    }
    

    dispatch(
        {
            type: 'IS_PROCORG_NAV_ACTIVE',
            payload: isactive
        }
    );

}