import Auth from "./pages/Auth";
import TodoApp from "./components/todo/TodoApp";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/todo-page" element={<TodoApp />} />
    </Routes>
  );
}

export default App;