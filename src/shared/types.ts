export enum CommonIntervals {
  TODAY = 'Today',
  YESTERDAY = 'Yesterday',
  MONTH = 'This month',
  YEAR = 'This year',
}

export type Interval = {
  startDate: Date;
  endDate: Date;
};

export enum TimeDimension {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
}

export type dayInfo = {
  date: number;
  monthStatus: 'prev' | 'current' | 'next';
  month: number;
  year: number;
};
