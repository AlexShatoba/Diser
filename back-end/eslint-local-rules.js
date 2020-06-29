const { InnerHTML, DomCalls } = require("./linter-rules/dom-rule");
const { ArrayMemoryAllocation, CreateArray } = require("./linter-rules/array-memory");
const { ConcatInLoop, UsingArrayMethods } = require("./linter-rules/loop")

'use strict';

module.exports = {
  "no-inner-html": InnerHTML,
  "no-array-memory-allocation": ArrayMemoryAllocation,
  "no-dom-calls": DomCalls,
  "no-concat-in-loop": ConcatInLoop,
  "no-array-proto-methods": UsingArrayMethods,
  "no-create-array": CreateArray,

};