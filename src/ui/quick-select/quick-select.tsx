import { useState, type FormEvent } from 'react';

import style from './quick-select.module.scss';
import clsx from 'clsx';
import type { IQuckSelectProps } from './quick-select.props';
import {
  calculateDate,
  getIntervalDates,
} from '../../shared/utils/calendar';
import { enumHasValue } from '../../shared/utils/type-helpers';
import { CommonIntervals, TimeDimension } from '../../shared/types';

export const QuickSelect = ({
  onQuickChange,
  onCommonChange,
  className,
}: IQuckSelectProps) => {
  const [value, setValue] = useState<number>(0);
  const [valueError, setValueError] = useState<boolean>(false);
  const [dimension, setDimension] = useState<TimeDimension>(
    TimeDimension.DAY
  );
  const [isAgo, setIsAgo] = useState<boolean>(true);

  function onDirectionSelect(direction: string) {
    setIsAgo(direction == 'last');
  }

  function handleDimensionSelect(dimension: string) {
    if (enumHasValue(TimeDimension, dimension)) {
      setDimension(dimension);
    }
  }

  function handleValueChange(value: number) {
    if (value < 0 || Number.isNaN(value)) {
      setValueError(true);
      setValue(value);
    } else {
      setValueError(false);
      setValue(value);
    }
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valueError) {
      isAgo
        ? onQuickChange({
            startDate: calculateDate(value, dimension, isAgo),
            endDate: new Date(),
          })
        : onQuickChange({
            startDate: new Date(),
            endDate: calculateDate(value, dimension, isAgo),
          });
    }
  }

  function handleCommonClick(common: CommonIntervals) {
    onCommonChange(getIntervalDates(common));
  }

  return (
    <div className={clsx(style.quickSelect, className)}>
      <div className={style.quickSelect__title}>Quick Select</div>
      <form className={style.form} onSubmit={handleFormSubmit}>
        <div className={style.form__row}>
          <select
            className={style.form__input}
            name="direction"
            id="direction"
            defaultValue={isAgo ? 'last' : 'next'}
            onChange={(e) => onDirectionSelect(e.target.value)}
          >
            <option value="last">last</option>
            <option value="next">next</option>
          </select>
          <input
            type="number"
            className={style.form__input}
            value={value}
            onChange={(e) =>
              handleValueChange(parseInt(e.target.value))
            }
          />

          <select
            className={style.form__input}
            name="dimension"
            id="dimension"
            defaultValue={dimension}
            onChange={(e) => handleDimensionSelect(e.target.value)}
          >
            <option value={TimeDimension.MINUTE}>minutes</option>
            <option value={TimeDimension.HOUR}>hours</option>
            <option value={TimeDimension.DAY}>days</option>
            <option value={TimeDimension.MONTH}>months</option>
            <option value={TimeDimension.YEAR}>years</option>
          </select>
          <button className={style.form__applyBtn}>Apply</button>
        </div>

        {valueError && (
          <div className={style.form__error}>Must be &gt;= 0</div>
        )}
      </form>
      <div className={style.common}>
        <div className={style.quickSelect__title}>Commonly Used</div>
        <div className={style.common__column}>
          <button
            className={style.common__btn}
            onClick={() => handleCommonClick(CommonIntervals.TODAY)}
          >
            Today
          </button>
          <button
            className={style.common__btn}
            onClick={() =>
              handleCommonClick(CommonIntervals.YESTERDAY)
            }
          >
            Yesterday
          </button>
          <button
            className={style.common__btn}
            onClick={() => handleCommonClick(CommonIntervals.MONTH)}
          >
            This month
          </button>
          <button
            className={style.common__btn}
            onClick={() => handleCommonClick(CommonIntervals.YEAR)}
          >
            This year
          </button>
        </div>
      </div>
    </div>
  );
};
