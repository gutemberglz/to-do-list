import "./index.sass";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { TaskProvider } from "./contexts/task/index.tsx";

createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
