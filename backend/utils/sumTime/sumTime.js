//сумма между объектами с {hours, minutes, seconds}
module.exports = (a, b) => {
  if (!(a.hours && a.minutes && a.seconds)) {
    return undefined;
  }

  if (!(b.hours && b.minutes && b.seconds)) {
    return undefined;
  }

  const newHours = a.hours + b.hours;
  const newMinutes = a.minutes + b.minutes;
  const newSeconds = a.seconds + b.seconds;

  if (!(typeof newHours === 'number' && typeof newMinutes === 'number' && typeof newSeconds === 'number')) {
    return undefined;
  }

  const carryMinutes = Math.floor(newSeconds / 60);
  const carryHours = Math.floor((newMinutes + carryMinutes) / 60);

  const formattedTime = `${newHours + carryHours}:${(newMinutes + carryMinutes) % 60}:${(newSeconds % 60)}`;

  return formattedTime;
}