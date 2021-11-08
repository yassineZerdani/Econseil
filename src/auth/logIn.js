import axios from 'axios';

async function logIn(credentials) {
    return axios.post(
      "http://econseil.dd:8083/user/login?_format=json",
      JSON.stringify({
        'name': credentials.username,
        'pass': credentials.password
    }), {
      headers: {
        'Content-Type': 'application/hal+json'
      },
      withCredentials: true
    }).
    then(data => data);
};

export {logIn};
