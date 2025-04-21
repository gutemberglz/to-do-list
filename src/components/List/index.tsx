import "./style.sass";

import { useTaskCtx } from "../../contexts/task";

export function List() {
  const { tasks } = useTaskCtx();

  return (
    <section>
      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>
                <h3>{task.title}</h3>
              </div>
              <div>{task.description}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
