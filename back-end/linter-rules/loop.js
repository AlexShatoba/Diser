exports.ConcatInLoop = {
  create: context => {
    return {
      ForStatement: node => {
        const operations = node.body.body;
        operations.forEach((operation, i) => {
          if (!!operation.expression && operation.expression.type === 'AssignmentExpression' && operation.expression.operator === '+=') {
            context.report({
              message: `For improve performance better use buffer and after loop do manipulations with buffer`,
              node: operation,
            });
          }
        })

      }
    }
  }
}

exports.UsingArrayMethods = {
  create: context => {
    return {
      CallExpression: node => {
        const arrayProtoLoopMethods = [
          'map',
          'forEach',
        ]
        if(!node.callee.property) {
          return;
        }
        const property = node.callee.property.name;

        if (arrayProtoLoopMethods.indexOf(property) >=0 && node.arguments.length >0 && node.arguments.length <=2) {
          context.report({
            message: `For improve performance, better use reverse cycle for loop`,
            node: node,
          });
        }        

      }
    }
  }
}
