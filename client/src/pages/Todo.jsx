import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from './axiosInstance';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const { register, handleSubmit, reset } = useForm();
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  // Fetch todos on component load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }finally {
      setIsLoading(false); 
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true); 
    if (editTodoId) {
      // Edit todo
      await axiosInstance.put(`/api/todos/${editTodoId}`, data);
      window.location.reload()
      setEditTodoId(null);
    } else {
      // Add new todo
      await axiosInstance.post('/api/todos', data);
     
    }
    fetchTodos();
    reset(); // Reset form fields
  };

  const deleteTodo = async (id) => {
    const confirm= window.confirm("Do you want to delete")
    if(!confirm){
      return
    }
   
    await axiosInstance.delete(`/api/todos/${id}`);
    fetchTodos();
  };

  const editTodo = (todo) => {
    setEditTodoId(todo._id);
    reset(todo); // Load the todo data into the form for editing
  };
  const logOut= async()=>{
    try {
      await axiosInstance.put('/logout')
      alert('successfully loged out')
     navigate('/login')
    } catch (error) {
      
    }
    
  }
 if(isLoading)return(
  <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
</div>
 )
  return (
    <div className="container mx-auto p-4">
      <span onClick={logOut} className=' text-md float-right font-extrabold text-red-500 hover:underline cursor-pointer transition duration-300 ease-in-out transform hover:scale-105'>Log Out</span>
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600 animate-fadeIn">
        To-Do List 
      </h1>

      {/* Form to add/edit to-dos */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            {...register('task', { required: true })}
            className="input input-bordered w-72 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            placeholder="Enter a task"
          />
          <button
            type="submit"
            className="btn btn-primary sm:btn-lg px-6 py-3 text-white hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            {editTodoId ? 'Update Todo' : 'Add Todo'}
          </button>
        </div>
      </form>

      {/* Todo List */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="p-4 border rounded-md  sm:block md:flex justify-between items-center bg-white shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            <span className="text-lg text-gray-800 break-words w-full sm:w-auto">
              {todo.task}
            </span>
            <div className="space-x-2   ">
              <button
                className="btn btn-xs sm:float-left  sm:btn-sm btn-warning transform transition-all duration-300 hover:scale-110"
                onClick={() => editTodo(todo)}
              >
                Edit
              </button>
              <button
                className="btn btn-xs sm:float-right sm:btn-sm btn-error transform transition-all duration-300 hover:scale-110"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
