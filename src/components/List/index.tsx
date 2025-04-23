import './style.sass';

import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import { useTaskCtx } from '../../contexts/task';
import { formatDate } from '../../helpers/formatDate';
import { Task } from '../../types/Task';

export function List() {
  const { tasks, delTask, toggleDoneTask } = useTaskCtx();

  const [tasksDone, setTasksDone] = useState<Task[]>([]);
  const [tasksNotDone, setTasksNotDone] = useState<Task[]>([]);

  function handleDeleteTask(idTask: number) {
    delTask(idTask);
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
            {tasksNotDone.map((task, index) => (
              <Li
                key={task.id}
                task={task}
                lastTask={index === 0}
                toggleDoneTask={handleToggleDoneTask}
                deleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        </section>
        <section>
          <h2>Tarefas feitas ({tasksDone.length})</h2>
          <ul>
            {tasksDone.map((task, index) => (
              <Li
                key={task.id}
                task={task}
                lastTask={index === 0}
                toggleDoneTask={handleToggleDoneTask}
                deleteTask={handleDeleteTask}
              />
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

type Props = {
  task: Task;
  lastTask: boolean;
  toggleDoneTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

function Li({ task, lastTask, toggleDoneTask, deleteTask }: Props) {
  const liRef = useRef<HTMLLIElement>(
    document.querySelector(`task-${task.id}`) as HTMLLIElement
  );
  const [liContentTouchStart, setLiColiContentTouchStart] = useState(0);

  function handleClickToggleDone(e: MouseEvent<HTMLLIElement>) {
    if (
      !(e.target as HTMLLIElement).classList.contains("area-icon") &&
      !(e.target as HTMLLIElement).parentElement?.classList.contains(
        "area-icon"
      )
    ) {
      if (liRef.current) {
        liRef.current.animate(
          [
            {
              height: `${liRef.current.getBoundingClientRect().height}px`,
            },
            { height: "0px", opacity: 0, padding: "0px" },
          ],
          {
            duration: 300,
            easing: "ease-in-out",
            iterations: 1,
            fill: "forwards",
          }
        );

        setTimeout(() => {
          toggleDoneTask(task.id);
        }, 280);
      }
    }
  }

  function handleDeleteTask() {
    if (liRef.current) {
      liRef.current.animate(
        [
          {
            height: `${liRef.current.getBoundingClientRect().height}px`,
          },
          { padding: "0px", height: "0px", opacity: 0 },
        ],
        {
          duration: 300,
          easing: "ease-in-out",
          iterations: 1,
          fill: "forwards",
        }
      );
      setTimeout(() => {
        if (!liRef.current) return;
        liRef.current.style.position = "absolute";

        setTimeout(() => {
          deleteTask(task.id);
        }, 50);
      }, 280);
    }
  }

  function handleContentTouchStart(e: TouchEvent) {
    setLiColiContentTouchStart(e.touches[0].clientX);
  }

  function handleContentTouchEnd(e: TouchEvent) {
    const { width } = liRef.current.getBoundingClientRect();
    const posX = 100 * (e.changedTouches[0].clientX - liContentTouchStart);

    if (posX / width > 60 || posX / width < -60) {
      handleDeleteTask();
    } else {
      const liContent = e.currentTarget as HTMLElement;
      liContent.style.position = "static";
      liContent.style.opacity = "1";
    }
  }

  function handleContentTouchMove(e: TouchEvent) {
    const { width } = liRef.current.getBoundingClientRect();
    const posX = 100 * (e.changedTouches[0].clientX - liContentTouchStart);
    const widthX = posX / width;
    const { clientX } = e.changedTouches[0];
    const liContent = e.currentTarget as HTMLElement;
    liContent.style.position = "absolute";
    liContent.style.left = `${clientX - liContentTouchStart}px`;

    if (widthX > 50 || widthX < -50) {
      liContent.style.opacity = "0.3";
    } else if (widthX > 70 || widthX < -70) {
      liContent.style.opacity = "0.2";
    } else if (widthX > 80 || widthX < -80) {
      liContent.style.opacity = "0";
    } else if (widthX < 60) {
      liContent.style.opacity = "1";
    }
  }

  useEffect(() => {
    if (liRef.current) {
      liRef.current.animate(
        [
          {
            opacity: "1",
            height: `61px`,
          },
        ],
        {
          duration: 300,
          iterations: 1,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }
  }, []);

  return (
    <li
      ref={liRef}
      id={`task-${task.id}`}
      className={`  ${lastTask && ""}`}
      onClick={handleClickToggleDone}
    >
      <div
        className={`li-content ${task.done && "done"}`}
        onTouchStart={handleContentTouchStart}
        onTouchEnd={handleContentTouchEnd}
        onTouchMove={handleContentTouchMove}
      >
        <div className="createdAt">{formatDate(task.createdAt)}</div>
        <div className="content">
          <div>
            <h3>{task.title}</h3>
          </div>
          <div className="icon" onClick={handleDeleteTask}>
            <MdDeleteOutline fontSize={28} />
          </div>
        </div>
      </div>
    </li>
  );
}
