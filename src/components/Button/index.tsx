import './style.sass';

type Props = {
  children: React.ReactNode;
};

export function Button({ children }: Props) {
  return <button type="button">{children}</button>;
}
