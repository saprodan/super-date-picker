import { parse } from 'date-format-parse';
import {
  CommonIntervals,
  TimeDimension,
  type Interval,
  type dayInfo,
} from '../types';

/**
 * Возвращает "календарный лист" для заданного месяца
 * @param year
 * @param month
 * @returns массив недель текущего месяца, дополненный днями соседних месяцев.
 */
export function getWeeksOfMonth(
  year: number,
  month: number
): dayInfo[][] {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();

  const daysInfo: dayInfo[] = [];
  // дни предыдущего месяца
  if (firstDayOfWeek !== 0) {
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    let date = daysInPrevMonth;
    for (let i = firstDayOfWeek - 1; i >= 0; date--, i--) {
      daysInfo.unshift({
        date,
        monthStatus: 'prev',
        month: month === 0 ? 11 : month - 1,
        year: year - 1,
      });
    }
  }

  // дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    daysInfo.push({ date: i, monthStatus: 'current', month, year });
  }

  // дни след месяца
  if (lastDayOfWeek !== 6) {
    let date = 1;
    for (let i = lastDayOfWeek + 1; i <= 6; date++, i++) {
      daysInfo.push({
        date,
        monthStatus: 'next',
        month: month === 11 ? 0 : month + 1,
        year: year + 1,
      });
    }
  }

  // разделяем на недели
  const weeks = [];
  for (let i = 0; i <= daysInfo.length - 7; i += 7) {
    weeks.push(daysInfo.slice(i, i + 7));
  }

  return weeks;
}

/**
 * Парсит строку, проверяет формат
 * @param value
 * @returns дата, если ОК, иначе undefined
 */
export function parseDate(
  value: string,
  dateFormat: string
): Date | undefined {
  // Првоерка для формата "mmm d, yyyy @ HH:MM:ss"
  const regFormat =
    /^[A-Z,a-z][A-Z,a-z][A-Z,a-z] \d\d?, \d\d\d\d @ \d\d:\d\d:\d\d$/;

  if (!regFormat.test(value)) return undefined;

  const date = parse(value, dateFormat);
  return date;
}

/**
 * Вычисляет относительную дату
 * @param value
 * @param relativity
 * @returns
 */
export function calculateDate(
  value: number,
  dimension: TimeDimension,
  isAgo: boolean
): Date {
  const now = new Date();
  switch (dimension) {
    case TimeDimension.YEAR: {
      const date = new Date(
        isAgo ? now.getFullYear() - value : now.getFullYear() + value,
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      return date;
    }
    case TimeDimension.MONTH: {
      const date = new Date(
        now.getFullYear(),
        isAgo ? now.getMonth() - value : now.getMonth() + value,
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      return date;
    }

    case TimeDimension.DAY: {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        isAgo ? now.getDate() - value : now.getDate() + value,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds()
      );
      return date;
    }
    case TimeDimension.HOUR: {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        isAgo ? now.getHours() - value : now.getHours() + value,
        now.getMinutes(),
        now.getSeconds()
      );
      return date;
    }
    case TimeDimension.MINUTE: {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        isAgo ? now.getMinutes() - value : now.getMinutes() + value,
        now.getSeconds()
      );
      return date;
    }
    default:
      return new Date();
  }
}

export function getIntervalDates(common: CommonIntervals): Interval {
  const now = new Date();
  switch (common) {
    case CommonIntervals.TODAY: {
      return {
        startDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        ),
        endDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          23,
          59,
          59
        ),
      };
    }
    case CommonIntervals.YESTERDAY: {
      return {
        startDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1
        ),
        endDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 1,
          23,
          59,
          59
        ),
      };
    }
    case CommonIntervals.MONTH: {
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();
      return {
        startDate: new Date(now.getFullYear(), now.getMonth(), 1),
        endDate: new Date(
          now.getFullYear(),
          now.getMonth(),
          daysInMonth,
          23,
          59,
          59
        ),
      };
    }
    case CommonIntervals.YEAR: {
      return {
        startDate: new Date(now.getFullYear(), 0, 1),
        endDate: new Date(now.getFullYear(), 11, 31, 23, 59, 59),
      };
    }
  }
}
