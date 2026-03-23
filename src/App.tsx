import Auth from "./pages/Auth";
import TodoApp from "./components/todo/TodoApp";
import SearchTodosPage from "./pages/SearchTodosPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/todo-page" element={<TodoApp />} />
      <Route path="/search-page" element={<SearchTodosPage />} />
    </Routes>
  );
}

export default App;