import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("jwt");
      const res = await axios.get(
        "http://localhost:4002/todo/fetch",
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTodos(res.data.todos);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch todos");
      toast.error("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async () => {
    try {
      if (!newTodo.trim()) {
        toast.error("Todo cannot be empty");
        return;
      }
      setIsCreating(true);
      const res = await axios.post(
        "http://localhost:4002/todo/create",
        { text: newTodo, completed: false },
        { withCredentials: true }
      );
      setTodos([...todos, res.data.newTodo]);
      setNewTodo('');
      toast.success("Todo created successfully!");
    } catch (error) {
      setError("Failed to create Todo");
      toast.error("Failed to create todo");
    } finally {
      setIsCreating(false);
    }
  };

  const updateTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const res = await axios.put(
        `http://localhost:4002/todo/update/${id}`,
        { ...todo, completed: !todo.completed },
        { withCredentials: true }
      );
      setTodos(todos.map((t) => t._id === id ? res.data.todo : t));
      toast.success(`Todo marked as ${!todo.completed ? 'completed' : 'incomplete'}`);
    } catch (error) {
      setError("Failed to update Todo");
      toast.error("Failed to update todo");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/todo/delete/${id}`, { withCredentials: true });
      setTodos(todos.filter((t) => t._id !== id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      setError("Failed to delete Todo");
      toast.error("Failed to delete todo");
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4002/user/logout", { withCredentials: true });
      toast.success("User logged out successfully");
      localStorage.removeItem('jwt');
      navigate('/login');
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const remainingTodos = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-start py-8 px-4">
      {/* Header */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Todo App
            </h1>
            <p className="text-gray-600 mt-2">Stay organized and productive</p>
          </div>
          <button
            onClick={logout}
            className="bg-white text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-lg">
            <div className="text-2xl font-bold">{remainingTodos}</div>
            <div className="text-blue-100 text-sm">Pending</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg">
            <div className="text-2xl font-bold">{completedTodos}</div>
            <div className="text-green-100 text-sm">Completed</div>
          </div>
        </div>

        {/* Input Section */}
        <div className="flex items-center mb-8 space-x-3">
          <div className="flex-grow relative">
            <input
              className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm bg-white/50 backdrop-blur-sm transition-all duration-300"
              type="text"
              value={newTodo}
              placeholder="What needs to be done?"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && createTodo()}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <button
            onClick={createTodo}
            disabled={isCreating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center space-x-2"
          >
            {isCreating ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
            <span>{isCreating ? "Adding..." : "Add"}</span>
          </button>
        </div>

        {/* Todo List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Loading your todos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={fetchTodos}
                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg">No todos yet</p>
                <p className="text-gray-400">Add your first todo above to get started!</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="group flex items-center justify-between bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-200"
                >
                  <div className="flex items-center space-x-4 flex-grow">
                    <button
                      onClick={() => updateTodo(todo._id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        todo.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                      }`}
                    >
                      {todo.completed && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span className={`text-gray-800 font-medium transition-all duration-300 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}>
                      {todo.text}
                    </span>
                  </div>

                  <button
                    onClick={() => todoDelete(todo._id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{todos.length} total todos</span>
            <span>{remainingTodos} remaining</span>
          </div>
        </div>
      </div>

      {/* Empty state illustration when no todos */}
      {!loading && todos.length === 0 && (
        <div className="mt-12 text-center">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-500">Start by adding your first todo above!</p>
        </div>
      )}
    </div>
  );
};

export default Home;