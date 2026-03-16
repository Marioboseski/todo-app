import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
} 

const TodoForm = ({ onAdd }: Props) => {
  const [ task, setTask ] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setTask(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!task.trim()) return;

    onAdd(task);
    setTask("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text"
        value={task}
        onChange={handleChange}
        placeholder="Task" />
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}

export default TodoForm;