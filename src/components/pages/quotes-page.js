import React, { useState } from "react";
import { Input } from "../common";

export const QuotesPage = () => {
  const [inputs, setValues] = useState({ min: "", max: "", length: "" });
  const [array, setArray] = useState([0]);
  const [mean, setMean] = useState(0);
  const [dev, setDev] = useState(0);
  const [timeGen, setTimeGen] = useState(0);
  const [timeComp, setTimeComp] = useState(0);

  const randomNumber = (min, max) => {
    min = min | 0;
    // max = ~~max;
    return (Math.random() * (max - min + 1) + min) | 0;
  };
  const meterPerf = (func, setter) => {
    let time = performance.now();
    func();
    time = performance.now() - time;
    setter(time);
  };

  const generateArray = () => {
    const { min, max, length } = inputs;
    let array = [];
    let mean = 0;
    let dev = 0;
    meterPerf(() => {
      for (let i = 0; i < length; i++) {
        array.push(randomNumber(min, max));
      }
    }, setTimeGen);
    meterPerf(() => {
      let sum = 0;
      let sum2 = 0;
      const length = array.length;
      for (let i = 0; i < length; i++) {
        sum += array[i];
        sum2 += array[i] ** 2;
      }
      mean = sum / length;
      dev = Math.sqrt(sum2 / length - mean ** 2);
    }, setTimeComp);
    setMean(mean);
    setDev(dev);
  };

  const handleInput = e => {
    setValues({ ...inputs, [e.target.id]: e.target.value });
  };
  return (
    <>
      <h1 className={"header"}>Quotes</h1>
      <div className="container">
        <Input
          label={"Min значение числа"}
          type="number"
          placeholder={"min"}
          value={inputs.min}
          onChange={handleInput}
          id={"min"}
        />
        <Input
          label={"Max значение числа"}
          type="number"
          placeholder={"max"}
          value={inputs.max}
          onChange={handleInput}
          id={"max"}
        />
        <Input
          label={"Введите длину массива"}
          type="number"
          placeholder={"length"}
          value={inputs.length}
          onChange={handleInput}
          id={"length"}
        />
        <button className={"button"} onClick={() => generateArray()}>
          Generate quotes
        </button>
      </div>
      <h2 className={"header"}>Results</h2>
      <div className={"results-container"}>
        <div className={"result"}>
          <b>Среднее:&nbsp;</b>
          <p>{mean}</p>
        </div>
        <div className={"result"}>
          <b>Стандартное отклонение:&nbsp;</b>
          <p>{dev}</p>
        </div>
        <div className={"result"}>
          <b>Мода:&nbsp;</b>
          <p>0</p>
        </div>
        <div className={"result"}>
          <b>Медиана:&nbsp;</b>
          <p>0</p>
        </div>
        <hr />
        <div className={"result"}>
          <b>Время генерации:&nbsp;</b>
          <p>{`${timeGen} мс`}</p>
        </div>
        <div className={"result"}>
          <b>Время расчетов:&nbsp;</b>
          <p>{`${timeComp} мс`}</p>
        </div>
      </div>
    </>
  );
};
