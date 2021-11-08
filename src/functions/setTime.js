const setTime = (val) => {

    var y = val.split('-')[0];
    var m = val.split('-')[1];
    var dhms = val.split('-')[2];
    var d = dhms.split('T')[0];

    return( y+'/'+m+'/'+'/'+d )

};

export { setTime };