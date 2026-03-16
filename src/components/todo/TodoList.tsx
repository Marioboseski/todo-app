import TodoItem from "./TodoItem";
import type { Todo } from "./TodoApp";

type Props = {
  todos: Todo[]
  onDelete: (id: number) => void
}

const TodoList = ({ todos, onDelete }: Props) => {
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;