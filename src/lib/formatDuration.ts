export default function formatDuration(time: number): {
  ms: string;
  secs: string;
  mins: string;
} {
  const ms = (time % 1000).toLocaleString("en-US", { minimumIntegerDigits: 3 });
  const secs = (Math.floor(time / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const mins = (Math.floor(time / 1000 / 60) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  return {
    mins,
    ms,
    secs,
  };
}
