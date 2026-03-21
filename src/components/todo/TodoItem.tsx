import { useState } from "react";
import type { Todo } from "./TodoApp";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  todo: Todo
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const TodoItem = ({ todo, onDelete, onToggle, onEdit }: Props) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (!editText.trim()) return;

    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const {
    attributes, listeners, setNodeRef,
    transform, transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} className="flex justify-center items-center gap-3 border-b-2 border-gray-300">

      <span {...attributes} {...listeners} style={{ cursor: "grab", touchAction: "none" }}>
    ☰
  </span>

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