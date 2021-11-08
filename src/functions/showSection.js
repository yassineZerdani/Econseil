import $ from "jquery";

const showSection = (n) => {

    console.log('start...');

    for (let i = 0; i < 6; i++) {
      if(i != n-1){
        $('#section'+i).hide();
      }
      if(i == n-1){
        $('#section'+n).show();
      } 
    }
    console.log('end...');
    
};

export {showSection};