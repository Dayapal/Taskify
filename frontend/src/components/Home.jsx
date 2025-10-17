import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('')
  const navigate = useNavigate()
  

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt")
      const res = await axios.get("http://localhost:4002/todo/fetch",{
        withCredentials: true
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
      setTodos(res.data.todos);
      console.log("response:", res.data.todos);
   
      
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };


  const createTodo = async () => {
    try {
      if (!newTodo) return;
      const res = await axios.post("http://localhost:4002/todo/create", {
        text: newTodo,
        completed: false
      }, {
        withCredentials: true
      })
      setTodos([...todos, res.data.newTodo])
      setNewTodo("")

    } catch (error) {
      setError("Failed to create Todo")
    }
  }

  const updateTodo = async (id) => {
    const todo = todos.find((t) => t._id === id)
    try {
      const res = await axios.put(`http://localhost:4002/todo/update/${id}`, {
        ...todo,
        completed: !todo.completed
      }, {
        withCredentials: true
      })
      console.log(res.data.todo)
      setTodos(todos.map((t) => t._id === id ? res.data.todo : t))
    } catch (error) {
      setError("failed to update todo")

    }
  }

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/todo/delete/${id}`, { withCredentials: true })
      setTodos(todos.filter((t) => t._id !== id))

    } catch (error) {
      setError("failed to Delete  Todo")
    }
  }

  const logout = async () => {
    try {
      await axios.get("http://localhost:4002/user/logout",
        { withCredentials: true }
      )
      toast.success("User logged out successfully")
      localStorage.removeItem('jwt')
      navigate('/login')

    } catch (error) {
      toast.error("Error logging out ")

    }

  }
  useEffect(() => {
    fetchTodos();
  }, []);


  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto px-6">
      <h1 className="text-2xl font-semibold text-center">Todo App</h1>

      <div flex mb-4>
        <input className=" my-10 flex-grow p-2 border roundedl-md focus:outline-none"
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && createTodo()}
          type="text" value={newTodo}
          placeholder="Add a new Todo"
        />

        <button onClick={createTodo} className="bg-blue-600 border rounded-r-md text-white py-2 px-4 hover:bg-blue-900 duration-300">Add</button>
      </div>

      {loading ? (<div><span>Loading...</span></div>) : error ? (<div>{error}</div>) : (
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={todo._id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
              <div className="flex items-center">
                <input type="checkbox" checked={todo.completed} onChange={() => updateTodo(todo._id)} className="mr-2" />
                <span className={`${todo.completed ? "line-through text-gray-800 font-semibold" : ""}`} >{todo.text}</span>

              </div>
              <button onClick={() => todoDelete(todo._id)} className="text-red-500 hover:text-red-800 duration-300">Delete</button>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-center text-sm text-gray-700 ">{remainingTodos} Todo Remaining</p>
      <button onClick={() => logout()} className="mt-4 mb-2 px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block">Logout</button>
    </div>
  );
};

export default Home;
