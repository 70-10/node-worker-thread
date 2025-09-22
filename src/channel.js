"use strict";

const EventEmitter = require("eventemitter3");
const request = require("./request");

class Channel extends EventEmitter {
  constructor(workerFn, workerMax) {
    super();
    this.worker = workerFn;
    this.workerMax = workerMax;
    this.requests = [];
    this.isRunning = true;
    this.executionCount = 0;
  }

  execute() {
    if (!this.isRunning) {
      return;
    }

    if (this.isBusy()) {
      setImmediate(() => this.execute());
      return;
    }

    if (this.requests.length > 0) {
      this.executionCount++;
      const task = this.requests.shift();
      request
        .execute(this.worker, task)
        .then((r) => this.done(null, r))
        .catch(this.done);
    }

    if (this.executionCount <= 0) {
      this.stop();
      return;
    }

    setImmediate(() => this.execute());
  }

  isBusy() {
    return this.executionCount >= this.workerMax;
  }

  stop() {
    this.isRunning = false;
    this.emit("stop");
  }

  add(args) {
    this.isRunning = true;
    this.requests.push(args);
    setImmediate(() => this.execute());
  }

  done(err, value) {
    this.emit("done", err, value);
    this.executionCount--;
  }
}

module.exports = Channel;
