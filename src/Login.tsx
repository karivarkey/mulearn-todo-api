import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  //const [loginAttempted, setLoginAttempted] = useState(false);
  const handleLogin = async ()=>  {
    
    try {
      const response = await axios.post('https://jelan.pythonanywhere.com/api/user/login', {
        username: username,
        password: password,
      });
  
      if (response.data.code == 200){
        //setLoggedIn(true);
        const auth_token = response.data.access_token;
       
        navigate('/todo', { state: { auth_token } });

      }
      // Handle successful login response
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error
    }
  };
    
  return (
    <div className="flex flex-col items-center justify-center h-screen card ">
      <div className="bg-gray-300 p-8 rounded-xl">
      <form className="w-full max-w-sm ">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 py-2 text-md text-center rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 py-2 text-md rounded-md text-center border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
        
      </form>
      <button
        onClick={handleLogin}
        className="w-full  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      <div className="mt-4 text-sm text-center  ">
        New here? <a href="/signin" className="text-blue-500">Sign In!</a>
      </div>

      </div>
    </div>
  );
}
  

export default Login;