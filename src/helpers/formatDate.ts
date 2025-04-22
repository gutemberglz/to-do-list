export function formatDate(date: Date) {
  return `${date.toLocaleString("pt-br", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })}`;
}
