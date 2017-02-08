function findCardinality(entityName, schema) {
  const findArr = schema.filter(function (item) {
      return item[0] === entityName
  })

  return findArr.map(function(item){
    return item[2]
  })
  .shift()
}

function filterAddedItens(item){
  return name === item[0] && type === item[1] && item[3] == true
}

function filterDeletedItens(item){
  return item[3] === false && name === item[0] && type === item[1]
}

function findBySchema(facts, schema) {
  if(!Array.isArray(facts))
    throw new Error( 'facts should be Array!' )

  if(!Array.isArray(schema))
    throw new Error( 'schema should be Array!' )

  return facts.filter(function (fact, index, arr) {
    [name, type, value, added] = fact

    const findArr = arr.filter(filterAddedItens)
    const findItem = findArr.pop()
    const cardinalityValue = findCardinality(type, schema)

    switch (cardinalityValue) {
      case 'many':
        const deletedItens = arr.filter(filterDeletedItens)

        if(deletedItens.length > 0)
          return added && findItem[2] === value

        return added
        break
      case 'one':
        return added && findItem[2] === value
        break
      default:
        throw new Error( 'schema not implement cardinality Value!' )
    }
  })

}



module.exports = findBySchema
