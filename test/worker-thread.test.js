import { test, expect } from 'vitest';
const wt = require("../src");

const twice = n => n * 2;
const twicePromise = n => Promise.resolve(n * 2);
function* twiceGenerator(num) {
  return yield twicePromise(num);
}

test("function", () => {
  return new Promise((resolve, reject) => {
    const ch = wt.createChannel(twice, 2);
    ch.on("done", (err, result) => {
      try {
        expect(err).toBeFalsy();
        expect(result).toBe(4);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    ch.on("error", err => {
      reject(err);
    });

    ch.add(2);
  });
});

test("stop", () => {
  const sampleChannel = wt.createChannel(twicePromise, 2);
  sampleChannel.stop();
});

test("promise", () => {
  return new Promise((resolve, reject) => {
    const ch = wt.createChannel(twicePromise, 2);
    ch.on("done", (err, result) => {
      try {
        expect(err).toBeFalsy();
        expect(result).toBe(4);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    ch.on("error", err => {
      reject(err);
    });

    ch.add(2);
  });
});

test("generator function", () => {
  return new Promise((resolve, reject) => {
    const ch = wt.createChannel(twiceGenerator, 2);
    ch.on("done", (err, result) => {
      try {
        expect(err).toBeFalsy();
        expect(result).toBe(4);
        resolve();
      } catch (error) {
        reject(error);
      }
    });

    ch.on("error", err => {
      reject(err);
    });

    ch.add(2);
  });
});
