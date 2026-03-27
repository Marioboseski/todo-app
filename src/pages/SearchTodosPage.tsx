import { useState, useEffect } from "react";
import { useTodoStore } from "../store/todoStore";
import TodoList from "../components/todo/TodoList";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const SearchTodosPage = () => {
  const { todos, deleteTodo, toggleTodo, editTodo, setTodos } = useTodoStore();
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(debounceQuery.toLowerCase())
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex(todo => todo.id === active.id);
    const newIndex = todos.findIndex(todo => todo.id === over.id);

    const newTodos = arrayMove(todos, oldIndex, newIndex);

    setTodos(newTodos);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col text-center gap-3 p-3 w-full">
        <Link to={"/todo-page"}><ArrowLeft /></Link>        
        <h2 className="text-3xl">Search Tasks</h2>
        <input type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search Task"
          className="border border-black/80 p-1 text-lg w-full max-w-36 rounded-md" />

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext
            items={filteredTodos.map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onEdit={editTodo}
            />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default SearchTodosPage;