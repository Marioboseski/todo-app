import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export type Todo = {
  id: number,
  text: string,
  completed: boolean,
}

const TodoApp = () => {

  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos(prev => [...prev, newTodo]);
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => (
      todo.id === id ? {...todo, completed: !todo.completed}
      : todo
    )));
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo}  />
    </div>
  );
}

export default TodoApp;