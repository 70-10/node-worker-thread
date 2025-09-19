import { test, expect } from 'vitest';
const Channel = require("../src/channel");

function worker(i) {
  return i;
}

test("executionCount = 0, execute -> stop", () => {
  return new Promise((resolve) => {
    const ch = new Channel(worker, 1);
    ch.on("stop", () => {
      expect(ch.isRunning).toBe(false);
      resolve();
    });

    expect(ch.executionCount).toBe(0);
    expect(ch.isRunning).toBe(true);

    ch.execute();
  });
});

test("is not busy", () => {
  const ch = new Channel(worker, 1);

  expect(ch.isBusy()).toBe(false);
});

test("is busy", () => {
  const ch = new Channel(worker, 1);
  ch.executionCount = 100;

  expect(ch.isBusy()).toBe(true);
});
