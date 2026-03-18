import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
}

const TodoForm = ({ onAdd }: Props) => {
  const [task, setTask] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.trim()) return;

    onAdd(task);
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-3">
      <input type="text"
        value={task}
        onChange={handleChange}
        placeholder="Task"
        className="form-inputs" />
      <button type="submit" className="form-buttons">Add task</button>
    </form>
  );
}

export default TodoForm;