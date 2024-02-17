import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const { token } = await response.json();
      // Save the token to local storage
      localStorage.setItem('token', token);
      setError(null);
      toast.success("Login Successful!");
      navigate('/')
      window.location.reload(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div style={{height:"80vh"}}>

      <form onSubmit={(e)=>{e.preventDefault(); handleLogin()}} autoComplete='off'>
        <h2>Login Form</h2>
        <div className="formDetails form-group">
          <label for="exampleInputEmail1">Username :</label>
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} required
          class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
        </div>
        <div class="form-group formDetails">
          <label for="exampleInputPassword1">Password :</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required
          class="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" class="btn btn-primary loginBtn">Login</button>

      </form>

    </div>
  );
}

export default LoginPage;

