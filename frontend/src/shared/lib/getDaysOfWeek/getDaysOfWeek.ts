const days = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
const oneDayMilliseconds = 24 * 60 * 60 * 1000;

export const getDaysOfWeek = (countDays: number): string[] => {
  const daysOfWeek: string[] = [];
  let currentDate: Date = new Date();

  for (let i = 0; i < countDays; ++i) {
    daysOfWeek.push(days[currentDate.getDay()]);
    currentDate = new Date(currentDate.getTime() - oneDayMilliseconds);
  }

  return daysOfWeek;
};