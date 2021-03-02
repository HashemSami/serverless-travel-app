export const getDateString = (targetDate) => {
  const date = new Date(targetDate);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${m}-${d}`;
};

export const calculateRemainingDays = (futureTimestamp) => {
  // calculate the dfference in days
  const current = new Date().getTime();
  const differenceInTime = futureTimestamp - current;
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
