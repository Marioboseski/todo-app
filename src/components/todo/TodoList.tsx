import TodoItem from "./TodoItem";
import type { Todo } from "./TodoApp";

type Props = {
  todos: Todo[]
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const TodoList = ({ todos, onDelete, onToggle, onEdit }: Props) => {
  return (
    <div className="w-full md:max-w-lg">
      <ul className="flex flex-col gap-1 w-full max-w-lg">
        {todos.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onToggle={onToggle} onEdit={onEdit} />
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;