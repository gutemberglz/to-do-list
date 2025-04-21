import "./style.sass";

import { FormEvent, useState } from "react";

import { useTaskCtx } from "../../contexts/task";
import { Button } from "../Button";
import { Input } from "../Input";

export function Form() {
  const { addTask } = useTaskCtx();
  const [title, setTitle] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handleAddTask();
  }

  function handleAddTask() {
    if (title.trim()) {
      addTask({ title });
      setTitle("");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Descreva sua tarefa"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <Button onClick={handleAddTask}>Salvar</Button>
    </form>
  );
}
