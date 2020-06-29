exports.InnerHTML = {
  create: context => {
    const innerHtmlMap = [];
    const callDOMProperty = [
      `write`,
      'innerText',
      'innerHTML',
    ]
    return {
      MemberExpression: node => {
        const ancestors = context.getAncestors(node);
        if (node.hasOwnProperty('property') && node.hasOwnProperty('object')) {
         
          if (callDOMProperty.indexOf(node.property.name) >= 0) {
            const declareParent = ancestors.find(parent => {
              var a;
              if (parent.type === 'ForStatement') {
                const message = `Don't use ${node.property.name} for ${node.object.name} in a loop. It's bad for performance`
                warning(context, message, node);
              } else {
                const declaredVariables = context.getDeclaredVariables(parent);
                a = findDeclaredVariables(context.getDeclaredVariables(parent), node.object.name)
              }
              return !!a ? true : false;
            });

            const declareParentId = !!declareParent && declareParent.hasOwnProperty('start') ? declareParent.start : 'global'
            const index = innerHtmlMap.indexOf(node.object.name + declareParentId);
            if (index >= 0) {
              const message = `Don't use ${node.property.name} for ${node.object.name} variable very often. It's bad for performance`
              return warning(context, message, node);
            } else {
              innerHtmlMap.push(`${node.object.name}${declareParentId}`);
            }
          }
        }
      }
    }
  }
}

exports.DomCalls = {
  create: context => {
    const domCallArguments = [];
    const callDOMProperty = [
      'getElementById',
      'getElementsByClassName',
      'getElementsByTagName',   
      'querySelector',
      'addEventListener'
    ];
    const availableArgumentTypes = [
      'Literal',
    ];
    return {
      CallExpression: node => {
        const property = node.callee? node.callee.property: null;
        const arguments = node.arguments? node.arguments: null;
        if (!!property && property.type === 'Identifier' && !!arguments) {
          if (callDOMProperty.indexOf(property.name) > -1) {
            if(callDOMProperty.indexOf(property.name) === 4) {
              const message = 'Better add event listener to parent element and delegate events, if you have dynamic components'
              return warning(context, message, node);
            }
            if( arguments.length > 1) {
              const message = 'Invalid argument!'
              return warning(context, message, node);
            }
            if(availableArgumentTypes.indexOf(arguments[0].type) === -1) {
              const message = 'For improve performance use string'
              return warning(context, message, node);
            }

            if(domCallArguments.indexOf(arguments[0].value) > -1) {
              const message = `For improve performance don't repeat calls to dom elements`
              return warning(context, message, node);
            } else {
              domCallArguments.push(arguments[0].value);
            }
          }
        }
      }
    }
  }
}

function findDeclaredVariables(variables, name) {
  return variables.find(variable => {
    return variable.name === name
  })
}

function warning(context, message, node) {
  context.report({
    node,
    message: message
  });
}
