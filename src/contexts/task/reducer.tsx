import { Task } from "../../types/Task";

type AddTask = {
  type: "addTask";
  payload: Omit<Task, "id" | "done" | "createdAt">;
};

type DeleteTask = {
  type: "delTask";
  payload: {
    id: number;
  };
};
type ToggleDoneTask = {
  type: "toggleDoneTask";
  payload: {
    id: number;
  };
};

type ActionsTask = AddTask | DeleteTask | ToggleDoneTask;

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

    case "toggleDoneTask": {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item.done = !item.done;
          return item;
        }
        return item;
      });
    }

    default:
      return state;
  }
}
