import { useState, type FormEvent } from 'react';

import style from './absolute-date-picker.module.scss';
import clsx from 'clsx';
import {
  getWeeksOfMonth,
  parseDate,
} from '../../shared/utils/calendar';
import type { IAbsoluteDatePickerProps } from './absolute-date-picker.props';
import { Icon } from '../../ui/icons';
import {
  FORMAT_MASK,
  MONTHS_LIST,
  TIME_LIST,
} from '../../shared/constants';
import { format } from 'date-format-parse';

export const AbsoluteDatePicker = ({
  initialDate,
  label,
  dateFormat,
  className,
  onChange,
}: IAbsoluteDatePickerProps) => {
  const [day, setDay] = useState<number>(initialDate.getDate());
  const [month, setMonth] = useState<number>(initialDate.getMonth());
  const [year, setYear] = useState<number>(initialDate.getFullYear());
  const [hours, setHours] = useState<number>(initialDate.getHours());
  const [minutes, setMinutes] = useState<number>(
    initialDate.getMinutes()
  );
  const [seconds, setSeconds] = useState<number>(
    initialDate.getSeconds()
  );

  const [inputDate, setInputDate] = useState<string>(
    format(initialDate, dateFormat || FORMAT_MASK)
  );
  const [isFormatError, setIsFormatError] = useState<boolean>(false);
  const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

  const yearsList = [year];
  for (let i = 1; i <= 5; i++) {
    yearsList.push(year + i);
    yearsList.unshift(year - i);
  }

  // Данные для календаря
  const weeks = getWeeksOfMonth(year, month);

  // Обработчики событий
  const onDateChange = (
    year: number,
    month: number,
    day: number,
    hours: number,
    minutes: number,
    seconds: number
  ) => {
    const date = new Date(year, month, day, hours, minutes, seconds);
    onChange(date);
    setInputDate(format(date, dateFormat || FORMAT_MASK));
  };

  const onBackClick = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
      onDateChange(year - 1, 11, day, hours, minutes, seconds);
    } else {
      setMonth(month - 1);
      onDateChange(year, month - 1, day, hours, minutes, seconds);
    }
  };
  const onNextClick = () => {
    if (month === 11) {
      // следующий год
      setMonth(0);
      setYear((y) => y + 1);
      onDateChange(year + 1, 0, day, hours, minutes, seconds);
    } else {
      setMonth(month + 1);
      onDateChange(year, month + 1, day, hours, minutes, seconds);
    }
  };

  const onDayClick = (day: number, month: number, year: number) => {
    setDay(day);
    setMonth(month);
    setYear(year);
    onDateChange(year, month, day, hours, minutes, seconds);
  };

  const onMonthSelect = (month: number) => {
    setMonth(month);
    onDateChange(year, month, day, hours, minutes, seconds);
  };
  const onYearSelect = (year: number) => {
    setYear(year);
    onDateChange(year, month, day, hours, minutes, seconds);
  };

  const onTimeClick = (hours: number, minutes: number) => {
    setHours(hours);
    setMinutes(minutes);
    setSeconds(0);
    onDateChange(year, month, day, hours, minutes, 0);
  };

  const onInputChange = (value: string) => {
    setInputDate(value);
    const date = parseDate(value, dateFormat || FORMAT_MASK);
    if (!date) {
      setIsFormatError(true);
    } else {
      setIsFormatError(false);
      setIsSubmitError(false);
    }
  };

  const handleDateSubmit = (e: FormEvent) => {
    e.preventDefault();
    const date = parseDate(inputDate, dateFormat || FORMAT_MASK);
    if (date) {
      setYear(date.getFullYear());
      setMonth(date.getMonth());
      setDay(date.getDate());
      setHours(date.getHours());
      setMinutes(date.getMinutes());
      setSeconds(date.getSeconds());
      onChange(date);
    } else {
      setIsSubmitError(true);
    }
  };

  return (
    <div className={clsx(style.absolutePicker, className)}>
      <div className={style.control}>
        <button className={style.control__btn} onClick={onBackClick}>
          <Icon icon="arrow-left" width={18} height={18} />
        </button>
        <select
          name="month"
          id="month"
          onChange={(e) => onMonthSelect(parseInt(e.target.value))}
          value={month}
          className={style.control__select}
        >
          {MONTHS_LIST.map((month) => (
            <option value={month.id} key={month.id}>
              {month.name}
            </option>
          ))}
        </select>
        <select
          name="year"
          id="year"
          onChange={(e) => onYearSelect(parseInt(e.target.value))}
          value={year}
          className={style.control__select}
        >
          {yearsList.map((y) => (
            <option value={y} key={y}>
              {y}
            </option>
          ))}
        </select>
        <button className={style.control__btn} onClick={onNextClick}>
          <Icon icon="arrow-right" width={18} height={18} />
        </button>
      </div>
      <div className={style.picker}>
        <div className={clsx(style.picker__calendar, style.calendar)}>
          <div className={style.calendar__days}>
            <div className={style.calendar__item}>Su</div>
            <div className={style.calendar__item}>Mo</div>
            <div className={style.calendar__item}>Tu</div>
            <div className={style.calendar__item}>We</div>
            <div className={style.calendar__item}>Th</div>
            <div className={style.calendar__item}>Fr</div>
            <div className={style.calendar__item}>Sa</div>
          </div>
          {weeks.map((week, i) => (
            <div className={style.calendar__week} key={i}>
              {week.map((calendarDay) => {
                return (
                  <div
                    className={clsx(
                      style.calendar__item,
                      style.calendar__day,
                      calendarDay.monthStatus === 'prev' &&
                        style.calendar__day_prev,
                      calendarDay.monthStatus === 'next' &&
                        style.calendar__day_next,
                      calendarDay.date === day &&
                        calendarDay.month === month &&
                        style.calendar__day_current
                    )}
                    onClick={() => {
                      onDayClick(
                        calendarDay.date,
                        calendarDay.month,
                        calendarDay.year
                      );
                    }}
                    key={calendarDay.date + calendarDay.month}
                  >
                    <span>{calendarDay.date}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className={style.picker__time}>
          {TIME_LIST.map((time) => (
            <button
              className={clsx(
                style.picker__timeItem,
                parseInt(time.hour) === hours &&
                  parseInt(time.minutes) === minutes &&
                  style.picker__timeItem_active
              )}
              key={time.hour + time.minutes}
              onClick={() =>
                onTimeClick(
                  parseInt(time.hour),
                  parseInt(time.minutes)
                )
              }
            >
              {time.hour}:{time.minutes}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={(e) => handleDateSubmit(e)}
        className={clsx(
          style.form,
          isSubmitError && style.form_error
        )}
      >
        <div className={style.form__label}>
          <p>{label}</p>
        </div>
        <input
          className={style.form__input}
          name="date"
          type="text"
          value={inputDate}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button className={style.form__parse}>
          <Icon icon="arrow-right" width={15} height={15} />
        </button>
      </form>

      {isFormatError && (
        <p className={style.inputError}>
          Allowed format: <span>{FORMAT_MASK}</span>
        </p>
      )}
    </div>
  );
};
