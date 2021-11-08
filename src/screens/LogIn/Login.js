import React, { useState } from 'react';
import { logIn } from '../../auth/logIn';
import { getUserId } from '../../auth/getUserId';


export default function Login() {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await logIn({
      username,
      password
    });
    const token = data.data.csrf_token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', await getUserId(data.data.current_user.name));
    window.location.reload();
  }

  return(






<div className="signin-container">
<h1 className="signin-welcome">Bienvenu !</h1>
<form onSubmit={handleSubmit}>
<input type="text" placeholder="Nom d'utilisateur" className="signin-username" onChange={e => setUserName(e.target.value)} required autofocus/>
<input type="password" placeholder="Mot de passe" className="signin-Password" onChange={e => setPassword(e.target.value)} required data-eye/>
<button type="submit" className="signin-btn">Sign in </button>


</form>
</div>
  )
}