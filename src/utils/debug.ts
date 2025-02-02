export function debug(obj: any) {
  const now = new Date();
  if (__DEV__) {
    console.debug(now, JSON.stringify(obj, null, 2));
  }
}

export function debugError(obj: any) {
  const now = new Date();
  if (__DEV__) {
    console.error(now, JSON.stringify(obj, null, 2));
  }
}
