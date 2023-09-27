//для преобразования 'hh:mm:ss' в {h, m, s}
module.exports = (time) => {
  const [ hours, minutes, seconds ] = time.split(':').map(Number);

  return {
    hours,
    minutes,
    seconds
  };
}