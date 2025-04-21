import "./App.sass";

import { Form } from "./components/Form";
import { List } from "./components/List";

export default function Home() {
  return (
    <main>
      <div className="box-content">
        <Form />
        <List />
      </div>
    </main>
  );
}
