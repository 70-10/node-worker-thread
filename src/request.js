"use strict";

module.exports = {
  execute,
};

async function execute(fn, args) {
  if (isGeneratorFunction(fn)) {
    const generator = fn(args);
    let result = generator.next();

    while (!result.done) {
      result = generator.next(await result.value);
    }

    return result.value;
  }

  return await fn(args);
}

function isGeneratorFunction(fn) {
  return fn && fn.constructor && fn.constructor.name === "GeneratorFunction";
}
