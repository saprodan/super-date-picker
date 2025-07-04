/**
 * проверяем наличие строки в enum
 * @param e - enum
 * @param v - value
 * @returns
 */
export function enumHasValue<E>(
  e: { [key: string]: E },
  v: any
): v is E {
  return Object.values(e).includes(v);
}
