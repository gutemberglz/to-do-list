import "./style.sass";

import { ButtonHTMLAttributes } from "react";

type Props = {
  children: React.ReactNode;
};

export function Button({
  children,
  ...res
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...res}>
      {children}
    </button>
  );
}
