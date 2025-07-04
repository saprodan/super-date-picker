import { useState } from 'react';

import style from './relative-date-picker.module.scss';
import clsx from 'clsx';
import type { IRelativeDatePickerProps } from './relative-date-picker.props';
import { FORMAT_MASK } from '../../shared/constants';
import { format } from 'date-format-parse';
import { calculateDate } from '../../shared/utils/calendar';
import { enumHasValue } from '../../shared/utils/type-helpers';
import { TimeDimension } from '../../shared/types';

export const RelativeDatePicker = ({
  label,
  dateFormat,
  onChange,
  className,
}: IRelativeDatePickerProps) => {
  const [value, setValue] = useState<number>(0);
  const [valueError, setValueError] = useState<boolean>(false);
  const [relativity, setRelativity] = useState<{
    dimension: TimeDimension;
    isAgo: boolean;
  }>({ dimension: TimeDimension.DAY, isAgo: true });

  function onRelativitySelect(relativity: string) {
    const dimension = relativity.split('-')[0];
    const isAgo = relativity.includes('ago');

    if (enumHasValue(TimeDimension, dimension)) {
      setRelativity({ dimension, isAgo });
      onChange(calculateDate(value, dimension, isAgo));
    }
  }

  function onValueChange(value: number) {
    if (value < 0 || Number.isNaN(value)) {
      setValue(value);
      setValueError(true);
    } else {
      setValueError(false);
      setValue(value);

      onChange(
        calculateDate(value, relativity.dimension, relativity.isAgo)
      );
    }
  }

  const dateStringValue = format(
    calculateDate(value, relativity.dimension, relativity.isAgo),
    dateFormat || FORMAT_MASK
  );

  return (
    <div className={clsx(style.relativePicker, className)}>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={style.form__row}>
          <input
            type="number"
            className={style.form__input}
            value={value}
            onChange={(e) => onValueChange(parseInt(e.target.value))}
          />

          <select
            className={style.form__input}
            name="relativity"
            id="relativity"
            defaultValue={'day-ago'}
            onChange={(e) => onRelativitySelect(e.target.value)}
          >
            <option value="minute-ago">minutes ago</option>
            <option value="hour-ago">hours ago</option>
            <option value="day-ago">days ago</option>
            <option value="month-ago">months ago</option>
            <option value="year-ago">years ago</option>
            <option value="minute-from-now">minutes from now</option>
            <option value="hour-from-now">hours from now</option>
            <option value="day-from-now">days from now</option>
            <option value="month-from-now">months from now</option>
            <option value="year-from-now">years from now</option>
          </select>
        </div>
        {valueError && (
          <div className={style.form__error}>Must be &gt;= 0</div>
        )}
      </form>

      <div className={style.output}>
        <div className={style.output__label}>
          <p>{label}</p>
        </div>
        <div className={style.output__value}>{dateStringValue}</div>
      </div>
    </div>
  );
};
