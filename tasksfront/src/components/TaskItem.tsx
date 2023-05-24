import { useTasks } from "../context/useTasks";
import { Task } from "../interface/task.interface";
import { IoCheckmarkDone, IoTrash } from "react-icons/io5";

interface Props {
  task: Task;
}

function TaskItem({ task }: Props) {
  const { deleteTask, updateTask } = useTasks();

  return (
    <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p className="text-slate-400">{task.description}</p>
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            if (!window.confirm("Are you sure you want to delete it?")) return;
            deleteTask(task._id);
          }}
        >
          <IoTrash className="hover:text-red-500" />
        </button>
        <button onClick={() => updateTask(task._id, { done: !task.done })}>
          {task.done ? (
            <IoCheckmarkDone className="hover:text-green-500" />
          ) : (
            <IoCheckmarkDone className="text-gray-500" />
          )}
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
