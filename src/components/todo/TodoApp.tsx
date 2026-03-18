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
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case "active":
        return !todo.completed

      case "completed":
        return todo.completed

      default: return true
    }
  })

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
      todo.id === id ? { ...todo, completed: !todo.completed }
        : todo
    )));
  }

  return (
    <div className="flex justify-center items-center p-2 min-h-dvh">
      <div className="flex flex-col justify-evenly items-center gap-3 w-full min-h-[600px] border-2 border-blue-300">
        <h1 className="text-2xl">Todo App</h1>
        <div className="flex flex-col justify-center items-center gap-3">
          <TodoForm onAdd={addTodo} />
          <div className="flex gap-3">

            <button onClick={() => setFilter("all")}
              style={{ background: filter === "all" ? "yellow" : "transparent" }}
            >All
            </button>

            <button onClick={() => setFilter("active")}
              style={{ background: filter === "active" ? "red" : "transparent" }}
            >Active
            </button>

            <button onClick={() => setFilter("completed")}
              style={{ background: filter === "completed" ? "green" : "transparent" }}
            >Completed
            </button>

          </div>
        </div>
        <TodoList todos={filteredTodos} onDelete={deleteTodo} onToggle={toggleTodo} />
      </div>
    </div>
  );
}

export default TodoApp;