export function dateParse(date: string) {
  let strings = date.split('/');
  let s = strings[2] + "-" + strings[1] + "-" + strings[0];
  return s
}
