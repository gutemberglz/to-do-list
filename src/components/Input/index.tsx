import './style.sass';

import { HTMLProps } from 'react';

export function Input({ ...res }: HTMLProps<HTMLInputElement>) {
  return <input type="text" autoCapitalize="sentences" {...res} />;
}
