const { InnerHTML, DomCalls } = require("./linter-rules/dom-rule");
const { ArrayMemoryAllocation } = require("./linter-rules/array-memory");
const { ConcatInLoop, UsingArrayMethods } = require("./linter-rules/loop")

'use strict';

module.exports = {
    "no-bad-await": {
      create: context => {
        const allowedAncestors = [
          "ReturnStatement",
          "VariableDeclarator",
          "ExpressionStatement",
          "AssignmentExpression"
        ];
  
        return {
          AwaitExpression: node => {
            const ancestors = context.getAncestors(node);
            const last = ancestors[ancestors.length - 1];
  
            if (!allowedAncestors.includes(last.type)) {
              context.report({
                node,
                message: "Не используйте await в выражениях."
              });
            }
          }
        };
      }
    },
    "no-inner-html": InnerHTML,
    "no-array-memory-allocation": ArrayMemoryAllocation,
    "no-dom-calls": DomCalls,
    "no-concat-in-loop": ConcatInLoop,
    "no-array-proto-methods": UsingArrayMethods,

  };