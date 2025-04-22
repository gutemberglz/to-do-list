import "./style.sass";

import { MouseEvent, useState } from "react";
import { MdMoreVert, MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";

import { useTaskCtx } from "../../contexts/task";
import { formatDate } from "../../helpers/formatDate";
import { Task } from "../../types/Task";

export function List() {
  const { tasks } = useTaskCtx();
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

  return (
    <section>
      <div>
        <ul>
          {tasks.map((task) => (
            <Li key={task.id} task={task} setIdPopover={handleIdPopover} />
          ))}
        </ul>
        {idPopover && (
          <div
            className="buttons"
            style={{
              left: `${idPopover.x - 70}px`,
              top: `${idPopover.y - 5}px`,
            }}
          >
            <div className="icon">
              <MdOutlineDelete fontSize={22} />
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
};
function Li({ task, setIdPopover }: Props) {
  function handleMoreClick(e: MouseEvent) {
    const { x } = e.currentTarget.getBoundingClientRect();
    setIdPopover(task.id, { x, y: e.pageY });
  }
  return (
    <li>
      <div className="createdAt">{formatDate(task.createdAt)}</div>
      <div className="content">
        <div>
          <h3>
            <label htmlFor={`check-${task.id}`}>{task.title}</label>
          </h3>
        </div>
        <div>
          <MdMoreVert fontSize={28} onClick={handleMoreClick} />
        </div>
      </div>
    </li>
  );
}

//
