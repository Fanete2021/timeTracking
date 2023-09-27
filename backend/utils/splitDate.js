const msHour = 60 * 60 * 1000;
const msMin = 60 * 1000;
const msSec = 1000;

//Функция для получения из даты {часы, минуты, секунды}
module.exports = (date) => {
  const differenceTime = Date.now() - new Date(date);

  const hours = Math.floor(differenceTime / msHour);
  const minutes = Math.floor((differenceTime % msHour) / msMin);
  const seconds = Math.floor((differenceTime % msMin) / msSec);

  return {
    hours,
    minutes,
    seconds
  }
}