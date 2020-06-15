exports.innerHTML = {
  create: context => {
    innerHtmlMap = [];
    callDOMProperty = [
      'innerHTML',
      'write',
    ]
    return {
      MemberExpression: node => {
        const ancestors = context.getAncestors(node);
        if (node.hasOwnProperty('property') && node.hasOwnProperty('object')) {
          if (callDOMProperty.indexOf(node.property.name) >= 0) {
            const declareParent = ancestors.find(parent => {
              var a;
              if (parent.type === 'ForStatement') {

                a = parent.init.declarations.find(variable => {
                  return variable.id.name === node.object.name
                })
              } else {
                const declaredVariables = context.getDeclaredVariables(parent);
                a = findDeclaredVariables(context.getDeclaredVariables(parent), node.object.name)
              }
              return !!a ? true : false;
            });

            const declareParentId = !!declareParent && declareParent.hasOwnProperty('start') ? declareParent.start : 'global'
            const index = innerHtmlMap.indexOf(node.object.name + declareParentId);
            if (index >= 0) {
              context.report({
                node,
                message: `Don't use innerHTML for ${node.object.name} variable very often. It's bad for performance`
              });
            } else {
              innerHtmlMap.push(`${node.object.name}${declareParentId}`);
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