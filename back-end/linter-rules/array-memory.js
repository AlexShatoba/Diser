exports.ArrayMemoryAllocation = {
  create: context => {
    innerHtmlMap = [];
    callDOMProperty = [
      'innerHTML',
      'innerText',
    ]
    return {
      NewExpression: node => {
        if(node.callee.name === 'Array' && isSize(node.arguments)){
          context.report({
            node,
            message: `Do not preallocate memory, it's bad for perfomance`
          });
        }

      }
    }
  }
}

function isSize(arguments) {
  return arguments.length === 1 && typeof arguments[0] !== Array && typeof arguments[0].value === 'number'?
    true:
    false;
}