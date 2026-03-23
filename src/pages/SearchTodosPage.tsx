import { useState, useEffect } from "react";
import type { Todo } from "../components/todo/TodoApp";

const SearchTodosPage = () => {
  const [ query, setQuery ] = useState("");
  const [ debounceQuery, setDebounceQuery ] = useState("");
  const [ todos, setTodos ] = useState<Todo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if(stored) setTodos(JSON.parse(stored));
  },[]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  },[query]);

  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(debounceQuery.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <div>
      <h2>Search Todos</h2>

      <input type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search Task" />

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTodosPage;