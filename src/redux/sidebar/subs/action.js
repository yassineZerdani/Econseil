

export const isCollapsed = (n) => async dispatch => {

    const json = JSON.parse(localStorage.getItem("state"));

    const state = json.sidebar_collapsed.is_sub_collapsed;

    let is_sub_collapsed = [false, false, false, false, false];

    if( n === 1){
        is_sub_collapsed = [false, false, false, false, false]
    }

    for(let i = 1; i < 5; i++){

        if( i+1 === n ){
            
            is_sub_collapsed[i] = true;
        }

        if( state[i] === true ){
            
            is_sub_collapsed[i] = false;
        }


    }

    console.log(is_sub_collapsed);
    

    dispatch(
        {
            type: 'IS_SUB_COLLAPSED',
            payload: is_sub_collapsed
        }
    );

}


export const Collapse = () => async dispatch => {

    let is_sub_collapsed = [false, false, false, false, false];

    dispatch(
        {
            type: 'COLLAPSE',
            payload: is_sub_collapsed
        }
    );

}