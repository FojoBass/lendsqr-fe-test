export const dropdownHandler = (
  wel: HTMLElement,
  cel: HTMLElement,
  isDrop: boolean
) => {
  if (isDrop) wel.style.height = cel.getBoundingClientRect().height + 'px';
  else wel.style.height = '0px';
};

export const dateHandler = (date: string): string => {
  let [, month, sDate, year, time] = new Date(date).toString().split(' ');
  time = modTime(time);

  return `${month} ${sDate}, ${year} ${time}`;
};

const modTime = (time: string): string => {
  const [hh, mm] = time.split(':');
  const isPm = parseInt(hh) >= 12;
  const modHh = `${isPm && parseInt(hh) > 12 ? parseInt(hh) - 12 : hh}`;
  let modTime = `${modHh}:${mm} ${isPm ? 'PM' : 'AM'}`;

  return modTime;
};
