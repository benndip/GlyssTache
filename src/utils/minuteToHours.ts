export function secondsToHours(time: number) {
  const hours = Math.floor(time / 3600);
  const seconds = Math.floor((time % 3600) / 60);

  return `${hours}h${seconds > 0 ? `${seconds}`.padStart(2, '0') : ''}`;
}

export function minutesToHours(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor((time % 60) / 60);

  return `${hours}h${minutes > 0 ? `${minutes}`.padStart(2, '0') : ''}`;
}

export function hoursToMinutes(time: number) {
  return time * 60;
}
