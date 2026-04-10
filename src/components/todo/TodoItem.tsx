import { useState, useRef, useEffect } from "react";
import type { Todo } from "./TodoApp";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Hand } from "lucide-react";

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
    const edited = editText.trim();

    if(!edited) return;

    if(edited !== todo.text) {
      onEdit(todo.id, edited)  
    }
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

  const inputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(isEditing) {
      inputFocus.current?.focus
    }
  },[isEditing]);

  return (
    <div ref={setNodeRef} style={style} className="flex justify-around items-center text-center gap-3 border-b-2 border-gray-300">

      <Hand {...attributes} {...listeners} style={{ cursor: "grab", touchAction: "none" }}/>  
      
      {isEditing ? (
        <input value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSubmit}
          ref={inputFocus}
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