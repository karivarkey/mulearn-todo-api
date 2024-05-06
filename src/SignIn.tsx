import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name,setLastName] = useState("");
  const [created,setCreated] = useState(false);
  const createAccount = async ()=>  {
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    var config = {
        method: 'post',
      maxBodyLength: Infinity,
        url: 'https://jelan.pythonanywhere.com/api/user/signup',
        headers: { 
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCreated(true);
      })
      .catch(function (error) {
        console.log(error);
      });
}

  return (
    <div>
      {" "}
      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </form>
      <button
        onClick={createAccount}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      {created ? (
        <p>Sucessful! <a href='/'>Login</a></p>
      ) : null}
    </div>
  );
};

export default SignIn;
