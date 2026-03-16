import TodoItem from "./TodoItem";
import type { Todo } from "./TodoApp";

type Props = {
  todos: Todo[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

const TodoList = ({ todos, onDelete, onToggle }: Props) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;