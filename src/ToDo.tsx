import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import FormData from "form-data";
import { CiLogout } from "react-icons/ci";
import { IconContext } from "react-icons";

// Define the Todo interface
interface Todo {
  id: number;
  title: string;
  expiry: string;
  status : string
}

const TodoComponent: React.FC = () => {

  const [title, setTitle] = useState('');
  const [expiry, setExpiry] = useState('');
  const [status, setStatus] = useState('');
  setStatus('');
  const location = useLocation();
  const { state } = location;
  const auth_token = state?.auth_token || "";
  console.log(status);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://jelan.pythonanywhere.com/api/todo/',
          headers: { 
            'Authorization': auth_token
          }
        };
        const response = await axios(config);
        console.log(response.data)
        setTodos(response.data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, [auth_token]);

  const addTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('expiry', expiry);
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://jelan.pythonanywhere.com/api/todo/',
        headers: { 
          'Authorization': auth_token,
        },
        data: data
      };
  
      console.log(data);
      const response = await axios(config);
      const newTodo: Todo = response.data; // Assuming the API response matches the Todo interface
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const mark_todo = async (id:number) =>{
    var data = new FormData();
    data.append('ids', id);
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://jelan.pythonanywhere.com/api/todo/markall',
      headers: { 
        'Authorization': auth_token,
      },
      data : data
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  const logout = async () => {
    var data = new FormData();

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://jelan.pythonanywhere.com/api/user/logout',
  headers: { 
    'Authorization': auth_token
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
  }

  const del_Todo = async (id: number) => {
    console.log(id)
    var config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://jelan.pythonanywhere.com/api/todo/${id}`, // Use the id parameter in the URL
      headers: { 
        'Authorization': auth_token
      }
    };
    try {
      await axios(config); // Await the axios call
      // Update todos after successful deletion
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
<div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 rounded-lg p-8">
        <IconContext.Provider value={{ color: "blue", className: "global-class-name text-5xl p-0"}}>
          <a href='/' onClick={logout}>
            <CiLogout />
          </a>
        </IconContext.Provider>
        <ul className="mt-8 ">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between py-2 border-b border-gray-200">
              <div>
                <p className="text-lg">{todo.title}</p>
                <p className="text-sm text-gray-500">Expiry: {todo.expiry}</p>
                <p className="text-sm text-gray-500">Status: {todo.status} </p>
              </div>
              <div>
                <button onClick={() => del_Todo(todo.id)} className="text-red-500 mr-4">REMOVE</button>
                <button onClick={() => mark_todo(todo.id)} className="text-green-500">MARK AS DONE</button>
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={addTodo} className="mt-8">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            placeholder="Expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md focus:outline-none focus:shadow-outline">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoComponent;
