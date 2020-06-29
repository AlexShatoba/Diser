exports.ArrayMemoryAllocation = {
  create: context => {
    return {
      NewExpression: node => {
        if (node.callee.name === 'Array' && isSize(node.arguments)) {
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
  return arguments.length === 1 && typeof arguments[0] !== Array && typeof arguments[0].value === 'number' ?
    true :
    false;
}

exports.ArrayMemoryAllocation = {
  create: context => {
    innerHtmlMap = [];
    callArrayProperty = [
      'unshift',
      'apply',
    ]
    return {
      CallExpression: node => {
        if (!!node.callee.property) {
          const property = node.callee.property.name
          var message = '';
          if (callArrayProperty.indexOf(property) >= 0) {
            message = 'For copy array better use slice or concat or map'
            if (callArrayProperty.indexOf(property) == 1) {
              if (node.callee.object.name === 'Array') {
                message = 'For copy array better use slice or concat or map'
              } else {return}
            }
            context.report({
              node,
              message: message,
            });
          }
        }

      }
    }
  }
}
