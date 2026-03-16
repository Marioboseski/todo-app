import type { Todo } from "./TodoApp";

type Props = {
  todo: Todo
  onDelete: (id: number) => void
}

const TodoItem = ({ todo, onDelete }: Props) => {
  return (
    <div>
      <p>{todo.text}</p>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;