import './style.sass';

import { Button } from '../Button';
import { Input } from '../Input';

export function Form() {
  return (
    <form>
      <Input placeholder="Descreva sua tarefa" />
      <Button>Salvar</Button>
    </form>
  );
}
