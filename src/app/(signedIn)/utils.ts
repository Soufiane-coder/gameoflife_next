import dayjs from "dayjs";

export const generateLast30Days = () => {
    const days = [];
    for (let i = 30; i >= 0; --i) {
      days.push(dayjs().subtract(i, 'day').format('YYYY-MM-DD'));
    }
    return days;
};