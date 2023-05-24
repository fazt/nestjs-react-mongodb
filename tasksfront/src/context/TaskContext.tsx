import { createContext, useEffect, useState } from "react";
import { CreateTask, Task, UpdateTask } from "../interface/task.interface";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";

interface TaskContextValue {
  tasks: Task[];
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TaskContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {
    throw new Error("createTask() not implemented");
  },
  deleteTask: async () => {
    throw new Error("deleteTask() not implemented");
  },
  updateTask: async () => {
    throw new Error("updateTask() not implemented");
  },
});

interface Props {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasksRequest()
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const createTask = async (task: CreateTask) => {
    const response = await createTaskRequest(task);
    const data = await response.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id: string) => {
    const response = await deleteTaskRequest(id);
    console.log(response)
    if (response.status === 204) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const updateTask = async (id: string, task: UpdateTask) => {
    const response = await updateTaskRequest(id, task);
    const data = await response.json();
    console.log(data)
    setTasks(
      tasks.map((task) => (task._id === id ? { ...task, ...data } : task))
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
