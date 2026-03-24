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

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: uuidv4(), text, completed: false },
      ],
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    })),

  editTodo: (id, text) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, text } : t
      ),
    })),

  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((t) => !t.completed),
    })),

  setTodos: (todos) => set({ todos }),
}));