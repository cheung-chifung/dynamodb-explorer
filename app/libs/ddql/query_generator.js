// const getPath = (node) => {
//   return node
// }

const selectGenerator = (ast) => {
  let params = {}
  let method = 'scan'
  // let hashKey = null
  // let rangeKey = null
  params['TableName'] = ast.table

  let attrIndex = 1
  let valIndex = 1
  let replaceAttributes = {}
  let replaceValues = {}
  let attrNameRepr = {}
  let attrValueRepr = {}

  let getAttrName = (attr) => {
    if (attr.type === 'normal' ||
        attr.type === 'placeholder') {
      return attr.value
    } else if (attr.type === 'path') {
      let attrNames = []
      attr.attributes.forEach(pathAttr => {
        attrNames.push(getAttrName(pathAttr))
      })
      return attrNames.join('.')
    } else if (attr.type === 'number' || attr.type === 'string') {
      let valOrigName = attr.value
      let valName = replaceValues[valOrigName]
      if (!valName) {
        valName = ':v' + valIndex
        if (attr.type === 'number') {
          attrValueRepr[valName] = {'N': attr.value}
        } else if (attr.type === 'string') {
          attrValueRepr[valName] = {'S': attr.value}
        }
        replaceValues[valOrigName] = valName
        valIndex++
      }
      return valName
    } else if (attr.type === 'type') {
      let valOrigName = attr.value
      let valName = replaceValues[valOrigName]
      if (!valName) {
        valName = ':v' + valIndex
        attrValueRepr[valName] = {'S': attr.value}
        replaceValues[valOrigName] = valName
        valIndex++
      }
      return valName
    } else {
      let attrOrigName = attr.value
      let attrName = replaceAttributes[attrOrigName]
      if (!attrName) {
        attrName = '#a' + attrIndex
        attrNameRepr[attrName] = attr.value
        replaceAttributes[attrOrigName] = attrName
        attrIndex++
      }
      return attrName
    }
  }

  if (ast.projection.type === 'INCLUDE') {
    let projections = []
    ast.projection.attributes.forEach(attr => {
      projections.push(getAttrName(attr))
    })
    params['ProjectionExpression'] = projections.join(',')
  }

  if (ast.where) {
    let keyCondExpr = ''
    if (ast && ast.where.hashKeyCondition) {
      let hashCond = ast.where.hashKeyCondition
      keyCondExpr += getAttrName(hashCond.hashKey) + ' = ' + getAttrName(hashCond.value)
      if (ast.where.rangeKeyCondition) {
        let rangeCond = ast.where.rangeKeyCondition
        keyCondExpr += ' AND ' + getAttrName(rangeCond.rangeKey) + ' ' + rangeCond.comparator + ' ' + getAttrName(rangeCond.value)
      }
    }
    params['KeyConditionExpression'] = keyCondExpr
    method = 'query'
  }

  if (ast.filter) {
    let generateFunctionExpression = (ast) => {
      switch (ast.function) {
        case 'attribute_exists':
        case 'attribute_not_exists':
          return ast.function + '(' + getAttrName(ast.args[0]) + ')'
        case 'attribute_type':
          return ast.function + '(' + getAttrName(ast.args[0]) + ',' + getAttrName(ast.args[1]) + ')'
        case 'begins_with':
          return ast.function + '(' + getAttrName(ast.args[0]) + ',' + getAttrName(ast.args[1]) + ')'
      }
      return ''
    }
    let generateConditionExpression = (ast) => {
      if (ast && ast.type === 'condition') {
        let condExpr = ''
        ast.node.forEach(condNode => {
          if (!condNode) {
            return
          }
          if (typeof condNode === 'object') {
            switch (condNode.type) {
              case 'compare':
                condExpr += ' ' + getAttrName(condNode.left) + ' ' + condNode.comparator + ' ' + getAttrName(condNode.right)
                break
              case 'function':
                condExpr += ' ' + generateFunctionExpression(condNode)
                break
              case 'condition':
                condExpr += ' (' + generateConditionExpression(condNode) + ')'
                break
            }
          } else if (typeof condNode === 'string') {
            switch (condNode) {
              case 'AND':
              case 'OR':
                condExpr += ' ' + condNode
            }
          }
        })
        return condExpr
      }
    }
    params['FilterExpression'] = generateConditionExpression(ast.filter)
  }
  if (Object.getOwnPropertyNames(attrNameRepr).length > 0) {
    params['ExpressionAttributeNames'] = attrNameRepr
  }
  if (Object.getOwnPropertyNames(attrValueRepr).length > 0) {
    params['ExpressionAttributeValues'] = attrValueRepr
  }

  return {'method': method, 'params': params}
}

const updateGenerator = (ast) => {
  let params = {}
  params['TableName'] = ast.table
  return {'method': 'updateItem', 'params': params}
}

const insertGenerator = (ast) => {
  let params = {}
  params['TableName'] = ast.table
  return {'method': 'putItem', 'params': params}
}

const deleteGenerator = (ast) => {
  let params = {}
  params['TableName'] = ast.table
  return {'method': 'deleteItem', 'params': params}
}

export default class {
  generate (ast) {
    switch (ast.action) {
      case 'select':
        return selectGenerator(ast)
      case 'insert':
        return insertGenerator(ast)
      case 'update':
        return updateGenerator(ast)
      case 'delete':
        return deleteGenerator(ast)
      default:
        return {}
    }
  }

  getDdqlValue (json) {
    if (!json) {
      return ''
    }
    var attrType, attrValue
    for (let key in json) {
      attrType = key
      attrValue = json[key]
    }
    switch (attrType) {
      case 'S':
      case 'N':
      case 'B':
        return attrValue
      case 'SS':
        return '<' + attrValue.join('|') + '>'
      case 'NS':
        return '<' + attrValue.join('|') + '>'
      case 'NULL':
        return 'NULL'
      case 'BOOL':
        return attrValue ? 'TRUE' : 'FALSE'
      case 'L':
        return 'dummy L'
      case 'M':
        return 'dummy M'
    }
    return ''
  }
}
