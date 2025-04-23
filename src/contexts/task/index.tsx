import { createContext, ReactNode, useContext, useReducer } from "react";

import { Task } from "../../types/Task";
import { reducerTask } from "./reducer";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "done" | "createdAt">) => void;
  delTask: (id: number) => void;
  toggleDoneTask: (id: number) => void;
};

const initCtx: TaskContextType = {
  tasks: [],
  addTask: () => null,
  delTask: () => null,
  toggleDoneTask: () => null,
};

const TaskContext = createContext<TaskContextType>(initCtx);

type Props = {
  children: ReactNode;
};

export function TaskProvider({ children }: Props) {
  const [tasks, dispatch] = useReducer(reducerTask, []);

  function addTask(payload: Omit<Task, "id" | "done" | "createdAt">) {
    dispatch({ type: "addTask", payload });
  }

  function delTask(id: number) {
    dispatch({ type: "delTask", payload: { id } });
  }

  function toggleDoneTask(id: number) {
    dispatch({ type: "toggleDoneTask", payload: { id } });
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, delTask, toggleDoneTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTaskCtx = () => useContext(TaskContext);
