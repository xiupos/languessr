// format time
export let format = (time: number) => {
  const min = Math.floor(time / 1000 / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, "0");
  const msec = Math.floor(time % 1000)
    .toString()
    .padStart(3, "0");
  return `${min}:${sec}.${msec}`;
};
