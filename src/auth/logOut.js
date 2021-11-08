const logOut = () => {

    localStorage.clear();
    window.location.href = '/';

};

export { logOut };