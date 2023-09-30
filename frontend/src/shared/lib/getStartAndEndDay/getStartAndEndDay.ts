export const getStartAndEndDay = (offset: number) => {
  const currentDate = new Date();
  const startDay = new Date(
    currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - offset, 0, 0, 0
  );
  const endDay = new Date(
    currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - offset, 23, 59, 59
  );

  return {
    startDay,
    endDay
  };
};