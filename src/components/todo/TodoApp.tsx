import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

export type Todo = {
  id: string,
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
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
    }
    setTodos(prev => [...prev, newTodo]);
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed }
        : todo
    )));
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }

  const editTodo = (id: string, newText: string) => {
    setTodos(prev => prev.map(todo => todo.id === id
      ? { ...todo, text: newText } : todo
    ));
  }

  const buttonClass = (type: string) => {
    return `${filter === type ? "bg-gray-200 border border-gray-400" : "bg-transparent border-none"
      }`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setTodos(prev => {
      const oldIndex = prev.findIndex(todo => todo.id === active.id);
      const newIndex = prev.findIndex(todo => todo.id === over.id);

      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  );

  return (
    <div className="flex justify-center items-center p-2 min-h-dvh">
      <div className="flex flex-col justify-evenly items-center gap-3 w-full min-h-[600px] border-2 border-blue-300">
        <Link to={"/search-page"}>Search</Link>        
        <h1 className="text-2xl">Todo App</h1>
        <div className="flex flex-col justify-center items-center gap-3">
          <TodoForm onAdd={addTodo} />
          <div className="flex gap-3">

            <button onClick={() => setFilter("all")}
              className={buttonClass("all")}
            >All
            </button>

            <button onClick={() => setFilter("active")}
              className={buttonClass("active")}
            >Active
            </button>

            <button onClick={() => setFilter("completed")}
              className={buttonClass("completed")}
            >Completed
            </button>

            <p>{activeCount}</p>

          </div>
          {todos.some(todo => todo.completed) && (
            <button onClick={clearCompleted}>Clear completed</button>
          )}
        </div>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={filteredTodos.map(todo => todo.id)} strategy={verticalListSortingStrategy}>
            <TodoList todos={filteredTodos} onDelete={deleteTodo} onToggle={toggleTodo} onEdit={editTodo} />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default TodoApp;