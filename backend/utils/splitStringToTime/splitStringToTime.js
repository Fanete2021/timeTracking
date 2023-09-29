//для преобразования 'hh:mm:ss' в {h, m, s}
module.exports = (time) => {
  const timeParts = time.split(':').map(Number);

  if (timeParts.length !== 3) {
    return undefined;
  }

  const [hours, minutes, seconds] = timeParts;

  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || !Number.isInteger(seconds)) {
    return undefined;
  }

  return {
    hours,
    minutes,
    seconds
  };
}