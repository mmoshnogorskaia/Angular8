export const calcOffset = (dateObj) => {
  const startMonth: Date = new Date(2019, dateObj.getMonth());
  return startMonth.getDay() - 1;
};

export const getDaysInCurrentMonth = (dateObj) => {
  return new Date(
    dateObj.getFullYear(),
    dateObj.getMonth() + 1,
    0
    ).getDate();
};
