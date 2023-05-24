import { ChangeEvent, FormEvent, useState } from "react";
import { useTasks } from "../context/useTasks";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    done: false,
  });
  const { createTask } = useTasks();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTask(task);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Write a task"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />

      <textarea
        name="description"
        rows={3}
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        placeholder="Write a description"
      ></textarea>

      <label className="inline-flex items-center gap-x-2">
        <input
          type="checkbox"
          value={task.done ? 1 : 0}
          onChange={() =>
            setTask({
              ...task,
              done: !task.done,
            })
          }
          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out "
        />
        <span>Done</span>
      </label>

      <button type="submit" className="bg-indigo-500 px-3 block py-2 w-full">
        Save
      </button>
    </form>
  );
}

export default TaskForm;
