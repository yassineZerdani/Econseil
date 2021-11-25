
export const sidebarToggle = () => async dispatch => {

    const json = JSON.parse(localStorage.getItem("state"));

    const state = json.sidebar_toggle.toggle;

    let toggle = state;

    if ( state === true ){
        toggle = false;
    }
    
    if ( state === false ){
        toggle = true;
    }

    if( toggle === false){
        document.body.classList.add("sidebar-toggle");
        document.body.classList.remove("sidebar-offcanvas-toggle");
        document.body.classList.remove("sidebar-collapse");
        document.body.classList.remove("sidebar-minified-out"); 
        document.body.classList.add("sidebar-minified"); 
    }
    if( toggle === true){
        document.body.classList.add("sidebar-toggle");
        document.body.classList.remove("sidebar-offcanvas-toggle");
        document.body.classList.remove("sidebar-minified"); 
        document.body.classList.remove("sidebar-minified-out"); 
    }

    console.log(toggle);

    dispatch(
        {
            type: 'TOGGLE',
            payload: toggle
        }
    );

}