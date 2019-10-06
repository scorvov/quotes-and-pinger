import React, { useState } from "react";
import { Input } from "../common";
import Ping from "./../utils/ping";

const check = new Ping();

export const PingPage = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const handleInput = e => {
    setUrl(e.target.value);
  };
  const checkPing = () => {
    check.ping(url, (err, ping) => {
      if (err) {
        setResult(err);
      } else setResult(`${ping} ms`);
    });
  };
  return (
    <>
      <h1 className={"header"}>Ping</h1>
      <div className={"container"}>
        <Input
          type="text"
          label={"Введите адрес сервера"}
          value={url}
          onChange={handleInput}
        />
        <button className={"button"} onClick={checkPing}>
          Ping
        </button>
        <div className={"result"}>
          <b>Результат: </b>
          <p>{result}</p>
        </div>
      </div>
    </>
  );
};
