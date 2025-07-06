import { useState } from "react";
import style from "./App.module.scss";
import SuperDatePicker from "./ui/super-date-picker/super-date-picker";
import { format } from "date-format-parse";
import type { OnTimeChangeProps } from "./ui/super-date-picker/super-date-picker.props";

const INIT_FORMAT = "DD MMM YYYY HH:mm:ss";
function App() {
  const [start, setStartDate] = useState<string>(
    format(new Date(), INIT_FORMAT)
  );
  const [end, setEndDate] = useState<string>(format(new Date(), INIT_FORMAT));

  const [userFormat, setUserFormat] = useState<string>(INIT_FORMAT);
  const [showUpdateButton, setShowUpdateButton] = useState<boolean>(true);

  function handleUpdateBtnChange() {
    setShowUpdateButton((state) => !state);
  }

  function handleFormatChange(value: string) {
    setUserFormat(value);
  }

  function resetFormat() {
    setUserFormat(INIT_FORMAT);
  }

  function handleTimeChange(result: OnTimeChangeProps) {
    setStartDate(result.start);
    setEndDate(result.end);
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        Super Date Picker for <br />
        "Эшелон Технологии"
      </h1>

      <div className={style.result}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={style.result__chb}>
            <input
              type="checkbox"
              onChange={handleUpdateBtnChange}
              checked={showUpdateButton}
            />
            Кнопка обновления
          </div>
          <p>
            <span>Формат:</span>
          </p>
          <div className={style.format}>
            <input
              className={style.format__input}
              type="text"
              value={userFormat}
              onChange={(e) => handleFormatChange(e.target.value)}
            />
            <button className={style.format__btn} onClick={resetFormat}>
              Сброс
            </button>
          </div>
        </form>
        <div className={style.result__item}>
          <span>Начальная дата: </span>
          {start}
        </div>
        <div className={style.result__item}>
          <span>Конечная дата: </span>
          {end}
        </div>
      </div>

      <SuperDatePicker
        onTimeChange={handleTimeChange}
        dateFormat={userFormat}
        showUpdateButton={showUpdateButton}
      />
    </div>
  );
}

export default App;
