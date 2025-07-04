import { useRef, useState } from 'react';
import type { ISuperDatePickerProps } from './super-date-picker.props';
import { Icon } from '../icons';

import style from './super-date-picker.module.scss';
import { OptionsTooltip } from '../options-tooltip';
import { FORMAT_MASK } from '../../shared/constants';
import { format } from 'date-format-parse';
import { AbsoluteDatePicker } from '../absolute-date-picker';
import Tabs from '../tabs/tabs';
import { RelativeDatePicker } from '../relative-date-picker';
import clsx from 'clsx';
import { QuickSelect } from '../quick-select';
import type { Interval } from '../../shared/types';

export default function SuperDatePicker({
  onTimeChange,
  showUpdateButton = true,
  dateFormat,
}: ISuperDatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [showStartOptions, setShowStartOptions] = useState(false);
  const [showEndOptions, setShowEndOptions] = useState(false);

  const refStartTarget = useRef<HTMLButtonElement>(null);
  const refEndTarget = useRef<HTMLButtonElement>(null);
  const refQuickSelectTarget = useRef<HTMLButtonElement>(null);

  function handleQuickSelectClick() {
    setShowQuickSelect((state) => !state);
  }
  function handleStartClick() {
    setShowStartOptions((state) => !state);
  }
  function handleEndClick() {
    setShowEndOptions((state) => !state);
  }

  function handleStartChange(date: Date) {
    setStartDate(date);
    if (!showUpdateButton) {
      onTimeChange({
        startDate,
        endDate,
        start: format(startDate, dateFormat || FORMAT_MASK),
        end: format(endDate, dateFormat || FORMAT_MASK),
      });
    }
  }

  function handleEndChange(date: Date) {
    setEndDate(date);
    if (!showUpdateButton) {
      onTimeChange({
        startDate,
        endDate,
        start: format(startDate, dateFormat || FORMAT_MASK),
        end: format(endDate, dateFormat || FORMAT_MASK),
      });
    }
  }

  function handleQuickSelectChange(interval: Interval) {
    setStartDate(interval.startDate);
    setEndDate(interval.endDate);
    onTimeChange({
      startDate: interval.startDate,
      endDate: interval.endDate,
      start: format(interval.startDate, dateFormat || FORMAT_MASK),
      end: format(interval.endDate, dateFormat || FORMAT_MASK),
    });
  }

  function handleCommonChange(interval: Interval) {
    setStartDate(interval.startDate);
    setEndDate(interval.endDate);
    onTimeChange({
      startDate: interval.startDate,
      endDate: interval.endDate,
      start: format(interval.startDate, dateFormat || FORMAT_MASK),
      end: format(interval.endDate, dateFormat || FORMAT_MASK),
    });
    setShowQuickSelect(false);
  }

  function handleUpdateClick() {
    onTimeChange({
      startDate: startDate,
      endDate: endDate,
      start: format(startDate, dateFormat || FORMAT_MASK),
      end: format(endDate, dateFormat || FORMAT_MASK),
    });
  }
  return (
    <>
      <div className={style.superPicker}>
        <div className={style.controls}>
          <button
            className={style.controls__quickSelect}
            onClick={handleQuickSelectClick}
            ref={refQuickSelectTarget}
            aria-label="quick select of date range"
          >
            <Icon
              icon="calendar"
              className={style.controls__qsIcon}
            />
          </button>
          {showQuickSelect && (
            <OptionsTooltip
              className={clsx(style.controls__options, style.padding)}
              onClose={() => setShowQuickSelect(false)}
              target={refQuickSelectTarget.current}
            >
              <QuickSelect
                onQuickChange={handleQuickSelectChange}
                onCommonChange={handleCommonChange}
              />
            </OptionsTooltip>
          )}
          <div className={style.controls__dates}>
            <button
              className={style.controls__start}
              onClick={handleStartClick}
              ref={refStartTarget}
            >
              <span>
                {format(startDate, dateFormat || FORMAT_MASK)}
              </span>
            </button>
            <Icon
              icon="arrow-right"
              className={style.controls__splitIcon}
            />
            <button
              className={style.controls__end}
              onClick={handleEndClick}
              ref={refEndTarget}
            >
              {format(endDate, dateFormat || FORMAT_MASK)}
            </button>
            {showStartOptions && (
              <OptionsTooltip
                className={style.controls__options}
                onClose={() => setShowStartOptions(false)}
                target={refStartTarget.current}
              >
                <Tabs
                  tabsNames={['Absolute', 'Relative', 'Now']}
                  childrenList={[
                    <AbsoluteDatePicker
                      className={style.padding}
                      initialDate={startDate}
                      label="Start date:"
                      dateFormat={dateFormat}
                      onChange={handleStartChange}
                    />,
                    <RelativeDatePicker
                      className={style.padding}
                      label="Start date:"
                      dateFormat={dateFormat}
                      onChange={handleStartChange}
                    />,
                    <div className={style.now}>
                      <button
                        className={style.now__btn}
                        onClick={() => setStartDate(new Date())}
                      >
                        Set time to NOW
                      </button>
                    </div>,
                  ]}
                />
              </OptionsTooltip>
            )}
            {showEndOptions && (
              <OptionsTooltip
                className={clsx(
                  style.controls__options,
                  style.controls__options_right
                )}
                onClose={() => setShowEndOptions(false)}
                target={refEndTarget.current}
              >
                <Tabs
                  tabsNames={['Absolute', 'Relative', 'Now']}
                  childrenList={[
                    <AbsoluteDatePicker
                      className={style.padding}
                      initialDate={endDate}
                      label="End date:"
                      onChange={handleEndChange}
                    />,
                    <RelativeDatePicker
                      className={style.padding}
                      label="End date:"
                      onChange={handleEndChange}
                    />,
                    <div className={style.now}>
                      <button
                        className={style.now__btn}
                        onClick={() => setEndDate(new Date())}
                      >
                        Set time to NOW
                      </button>
                    </div>,
                  ]}
                />
              </OptionsTooltip>
            )}
          </div>
        </div>
        {showUpdateButton && (
          <button
            className={style.updateBtn}
            onClick={handleUpdateClick}
          >
            <span>Update</span>
          </button>
        )}
      </div>
    </>
  );
}
