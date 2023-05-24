import TaskItem from "./TaskItem";
import { useTasks } from "../context/useTasks";

function TasksList() {
  const { tasks } = useTasks();

  if (!tasks.length)
    return <p className="text-center text-xl font-bold my-4">No tasks Yet</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksList;
