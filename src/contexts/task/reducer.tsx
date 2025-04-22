import { Task } from "../../types/Task";

type AddTask = {
  type: "addTask";
  payload: Omit<Task, "id" | "done" | "createdAt">;
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
      const id = state.length === 0 ? 1 : state[0].id + 1;
      return [
        { ...action.payload, done: false, createdAt: new Date(), id },
        ...state,
      ];
    }

    case "delTask": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    default:
      return state;
  }
}
