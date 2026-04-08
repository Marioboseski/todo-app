import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoStore = {
  todos: Todo[];

  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
  setTodos: (todos: Todo[]) => void;
};

const getInitialTodos = (): Todo[] => {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: getInitialTodos(),

  addTodo: (text) =>
    set((state) => {
      const newTodos = [
        ...state.todos,
        { id: uuidv4(), text, completed: false },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos }
    }),

  deleteTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => todo.id !== id);

      localStorage.setItem("todos", JSON.stringify(newTodos));

      return { todos: newTodos };
    }),

  toggleTodo: (id) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return ({ todos: newTodos });
    }),

  editTodo: (id, text) =>
    set((state) => {
      const newTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  clearCompleted: () =>
    set((state) => {
      const newTodos = state.todos.filter((todo) => !todo.completed);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return { todos: newTodos }
    }),
  setTodos: (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    set({ todos });
  }
}));