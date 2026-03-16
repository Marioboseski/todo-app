import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export type Todo = {
  id: number,
  text: string
}

const TodoApp = () => {

  const [ todos, setTodos ] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text
    }
    setTodos(prev => [...prev, newTodo]);
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
    </div>
  );
}

export default TodoApp;