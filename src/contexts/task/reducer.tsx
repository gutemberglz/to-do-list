import { Task } from "../../types/Task";

type AddTask = {
  type: "addTask";
  payload: Omit<Task, "id" | "done">;
};

type RemoveTask = {
  type: "delTask";
  payload: {
    id: number;
  };
};

type ActionsTask = AddTask | RemoveTask;

export function reducerTask(state: Task[], action: ActionsTask): Task[] {
  switch (action.type) {
    case "addTask": {
      const id = state.length === 0 ? 1 : state[state.length - 1].id + 1;
      return [...state, { ...action.payload, done: false, id }];
    }

    case "delTask": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    default:
      return state;
  }
}
