import type { Todo } from "./TodoApp";

type Props = {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TodoItem = ({ todo, onDelete, onToggle }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2 border-b-2 border-gray-300">
      <p className="text-lg">{todo.text}</p>

      <button onClick={() => onDelete(todo.id)} className="text-lg">Delete</button>

      <input type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)} />
    </div>
  );
}

export default TodoItem;