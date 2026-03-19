import TodoItem from "./TodoItem";
import type { Todo } from "./TodoApp";

type Props = {
  todos: Todo[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  onEdit: (id: number, text: string) => void
}

const TodoList = ({ todos, onDelete, onToggle, onEdit }: Props) => {
  return (
    <div>
      <ul className="flex flex-col ">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;