import "./style.sass";

import { MouseEvent, useEffect, useState } from "react";
import { MdMoreVert, MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";

import { useTaskCtx } from "../../contexts/task";
import { formatDate } from "../../helpers/formatDate";
import { Task } from "../../types/Task";

export function List() {
  const { tasks, delTask, toggleDoneTask } = useTaskCtx();

  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [tasksNotDone, setTasksNotDone] = useState<Task[]>([]);

  const [idPopover, setIdPopover] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);

  function handleIdPopover(id: number, { x, y }: { x: number; y: number }) {
    if (idPopover?.id === id) {
      setIdPopover(null);
    } else {
      setIdPopover({ id, x, y });
    }
  }

  function handleDeleteTask(idTask: number) {
    delTask(idTask);
    setIdPopover(null);
  }

  function handleToggleDoneTask(idTask: number) {
    toggleDoneTask(idTask);
  }

  useEffect(() => {
    setTasksDone(tasks.filter((item) => item.done));
    setTasksNotDone(tasks.filter((item) => !item.done));
  }, [tasks]);

  return (
    <section>
      <div>
        <section>
          <h2>Tarefas pendentes ({tasksNotDone.length})</h2>
          <ul>
            {tasksNotDone.map((task) => (
              <Li
                key={task.id}
                task={task}
                setIdPopover={handleIdPopover}
                toggleDoneTask={handleToggleDoneTask}
                deleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        </section>
        <section>
          <h2>Tarefas feitas ({tasksDone.length})</h2>
          <ul>
            {tasksDone.map((task) => (
              <Li
                key={task.id}
                task={task}
                setIdPopover={handleIdPopover}
                toggleDoneTask={handleToggleDoneTask}
                deleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        </section>
        {idPopover && (
          <div
            className="buttons"
            style={{
              left: `${idPopover.x - 70}px`,
              top: `${idPopover.y - 5}px`,
            }}
          >
            <div className="icon">
              <MdOutlineDelete
                fontSize={22}
                onClick={() => handleDeleteTask(idPopover.id)}
              />
            </div>
            <div className="icon">
              <MdOutlineModeEdit fontSize={22} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

type Props = {
  task: Task;
  setIdPopover: (id: number, { x, y }: { x: number; y: number }) => void;
  toggleDoneTask: (id: number) => void;
  deleteTask: (id: number) => void;
};
function Li({ task, setIdPopover, toggleDoneTask, deleteTask }: Props) {
  function handleMoreClick(e: MouseEvent) {
    const { x } = e.currentTarget.getBoundingClientRect();
    setIdPopover(task.id, { x, y: e.pageY });
  }

  function handleClickToggleDone(e: MouseEvent<HTMLLIElement>) {
    if (
      !(e.target as HTMLLIElement).classList.contains("area-icon") ||
      !(e.target as HTMLLIElement).parentElement?.classList.contains(
        "area-icon"
      )
    ) {
      toggleDoneTask(task.id);
    }
  }

  function handleDeleteTask() {
    deleteTask(task.id);
  }

  return (
    <li className={` ${task.done && "done"}`} onClick={handleClickToggleDone}>
      <div className="createdAt">{formatDate(task.createdAt)}</div>
      <div className="content">
        <div>
          <h3>
            <label htmlFor={`check-${task.id}`}>{task.title}</label>
          </h3>
        </div>
        <div className="area-icon icon">
          {!task.done && (
            <MdMoreVert
              className="area-icon"
              fontSize={28}
              onClick={handleMoreClick}
            />
          )}
          {task.done && (
            <div className="area-icon icon">
              <MdOutlineDelete fontSize={22} onClick={handleDeleteTask} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

//
