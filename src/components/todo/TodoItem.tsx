import { useState } from "react";
import type { Todo } from "./TodoApp";

type Props = {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string) => void
}

const TodoItem = ({ todo, onDelete, onToggle, onEdit }: Props) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (!editText.trim()) return;

    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center gap-3 border-b-2 border-gray-300">

      {isEditing ? (
        <input value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditText(todo.text);
            }
          }} />
      ) : (
        <p onDoubleClick={() => setIsEditing(true)} className="text-lg">{todo.text}</p>
      )}

      <button onClick={() => onDelete(todo.id)} className="text-lg">Delete</button>

      <input type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)} />

      <button onClick={() => setIsEditing(true)} className="text-lg">Edit</button>

    </div>
  );
}

export default TodoItem;