import React, { useState } from "react";
import { Input } from "../common";
import { calculate, generateArray, performanceTime } from "../utils/quotes";

export const QuotesPage = () => {
  const [inputs, setInputs] = useState({ min: "", max: "", length: "" });
  const [values, setValues] = useState({ mean: 0, dev: 0 });
  const [time, setTime] = useState({ gen: 0, calc: 0 });

  const clearParameters = () => {
    setValues({ mean: 0, dev: 0 });
    setTime({ gen: 0, calc: 0 });
  };
  const handleInput = e => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
    clearParameters();
  };

  const performanceMeter = (func, type) => {
    let newTime = performanceTime(func);
    setTime(time => ({ ...time, [type]: time[type] + newTime }));
  };

  const calcStream = () => {
    clearParameters();
    const { min, max, length } = inputs;
    let array = [];
    let newValues;
    let intervals = [Math.trunc(length / 1000000), length % 1000000];
    let intervalId = null;
    let j = 0;
    let funcInterval = () => {
      let myLength = j < intervals[0] ? 1000000 : intervals[1];
      if (j <= intervals[0] && myLength) {
        j++;
        performanceMeter(() => {
          array = generateArray({ min, max, length: myLength });
        }, "gen");
        performanceMeter(() => {
          newValues = calculate(array);
          array = [];
        }, "calc");
        setValues(values => {
          let mean = (values.mean + newValues.mean) / 2;
          let dev = (values.dev + newValues.dev) / 2;
          return { mean, dev };
        });
      } else clearTimeout(intervalId);
    };
    intervalId = setInterval(funcInterval, 80);
  };


  return (
    <>
      <h1 className={"header"}>Quotes</h1>
      <div className="container">
        <Input
          label={"Minimum value of the number"}
          type="number"
          placeholder={"min"}
          value={inputs.min}
          onChange={handleInput}
          id={"min"}
        />
        <Input
          label={"Maximum value of the number"}
          type="number"
          placeholder={"max"}
          value={inputs.max}
          onChange={handleInput}
          id={"max"}
        />
        <Input
          label={"Array length"}
          type="number"
          placeholder={"length"}
          value={inputs.length}
          onChange={handleInput}
          id={"length"}
        />
        <button className={"button"} onClick={calcStream}>
          Generate quotes
        </button>
      </div>
      <h2 className={"header"}>Results</h2>
      <div className={"results-container"}>
        <div className={"result"}>
          <b>Average:&nbsp;</b>
          <p>{values.mean}</p>
        </div>
        <div className={"result"}>
          <b>Standard deviation:&nbsp;</b>
          <p>{values.dev}</p>
        </div>
        <hr />
        <div className={"result"}>
          <b>Generation time:&nbsp;</b>
          <p>{`${time.gen} мс`}</p>
        </div>
        <div className={"result"}>
          <b>Computation time:&nbsp;</b>
          <p>{`${time.calc} мс`}</p>
        </div>
      </div>
    </>
  );
};
