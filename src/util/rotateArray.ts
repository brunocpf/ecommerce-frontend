export default function rotateArray<T extends Array<any>>(arr: T, i: number) {
  const cpy = [...arr];
  cpy.unshift(...cpy.splice(i));
  return cpy;
}
