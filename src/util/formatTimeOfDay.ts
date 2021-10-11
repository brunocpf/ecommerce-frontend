function formatTimeValue(value: number) {
  return value.toString().padStart(2, '0');
}

export default function formatTimeOfDay(hour: number, minute: number) {
  return `${formatTimeValue(hour)}:${formatTimeValue(minute)}`;
}
