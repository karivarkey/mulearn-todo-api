import Login from "./Login"
import TodoComponent from "./ToDo";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoComponent />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
      
    </h1>
    
  )
}