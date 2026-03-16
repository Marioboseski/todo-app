import type { Todo } from "./TodoApp";

type Props = {
  todo: Todo
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TodoItem = ({ todo, onDelete, onToggle }: Props) => {
  return (
    <div>
      <p>{todo.text}</p>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
      
      <input type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)} />
    </div>
  );
}

export default TodoItem;