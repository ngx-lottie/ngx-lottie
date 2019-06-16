export function getLastTwoArguments<T, U>() {
  const length = process.argv.length;
  return (process.argv.slice(length - 2, length) as unknown) as [T, U];
}
