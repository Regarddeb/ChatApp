// datetimeUtils.js
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const calculateTimeDifference = (datetime: string) => {
  const inputDateTime = dayjs(datetime);
  const currentTime = dayjs();
  const relativeDifference = inputDateTime.from(currentTime);

  return relativeDifference;
};
