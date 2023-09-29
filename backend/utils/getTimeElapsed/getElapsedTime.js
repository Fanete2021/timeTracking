const msHour = 60 * 60 * 1000;
const msMin = 60 * 1000;
const msSec = 1000;

//Функция вернет сколько прошло часов, минут и секунд от переданной даты.
module.exports = (date) => {
  if (!(date instanceof Date)) {
    return undefined;
  }

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