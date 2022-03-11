export function hasError<T>(input: T, errors: any) {
  const message = errors[input]?.message;

  return !!message;
}
