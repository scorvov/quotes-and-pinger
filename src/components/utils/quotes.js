export const calculate = array => {
  let sum = 0;
  let sum2 = 0;
  const length = array.length;
  for (let i = 0; i < length; i++) {
    sum += array[i];
    sum2 += array[i] ** 2;
  }
  const mean = sum / length;
  const dev = Math.sqrt(sum2 / length - mean ** 2);
  return { mean, dev };
};
export const generateArray = inputs => {
  const { min, max, length } = inputs;
  let array = [];
  for (let i = 0; i < length; i++) {
    array.push(randomNumber(min, max));
  }
  return array;
};
const randomNumber = (min, max) => {
  min = min | 0;
  // max = ~~max;
  return (Math.random() * (max - min + 1) + min) | 0;
};
export const performanceTime = func => {
  let time = performance.now();
  func();
  time = performance.now() - time;
  return time;
};
