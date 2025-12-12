export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const unit in intervals) {
    const interval = intervals[unit];
    if (seconds >= interval) {
      const count = Math.floor(seconds / interval);
      return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
        -count,
        unit as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return "just now";
}
