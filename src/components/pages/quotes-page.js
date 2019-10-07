import React, { useState, useEffect } from "react";
import { Input } from "../common";

export const QuotesPage = () => {
  const [inputs, setInputs] = useState({ min: "", max: "", length: "" });
  const [values, setValues] = useState({ mean: 0, dev: 0 });
  const [time, setTime] = useState({ gen: 0, calc: 0 });

  const randomNumber = (min, max) => {
    min = min | 0;
    return (Math.random() * (max - min + 1) + min) | 0;
  };
  /*  const meterPerf = (func) => {
    let time = performance.now();
    func();
    time = performance.now() - time;
  };*/

  const generateArray = async () => {
    const { min, max, length } = inputs;
    let mean = 0;
    let dev = 0;
    let sum = 0;
    let sum2 = 0;
    let i = 0;
    for (i; i < length; i++) {
      let x = randomNumber(min, max);
      sum += x;
      sum2 += x ** 2;
      if (i && (i % 1000000 === 0 || i === length - 1)) {
        mean = sum / i;
        dev = Math.sqrt(sum2 / i - mean ** 2);
        await setValues({ mean, dev });
      }
    }
  };

  const handleInput = e => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  useEffect(() => console.log(values), [values]);

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
          <p>{values.mean}</p>
        </div>
        <div className={"result"}>
          <b>Стандартное отклонение:&nbsp;</b>
          <p>{values.dev}</p>
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
          <p>{`${time.gen} мс`}</p>
        </div>
        <div className={"result"}>
          <b>Время расчетов:&nbsp;</b>
          <p>{`${time.calc} мс`}</p>
        </div>
      </div>
    </>
  );
};
