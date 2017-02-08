function findCardinality(entityName, schema) {
  const findArr = schema.filter(function (item) {
      return item[0] === entityName
  })

  return findArr.map(function(item){
    return item[2]
  })
  .shift()
}

function findBySchema(facts, schema) {
  if(!Array.isArray(facts))
    throw new Error( 'facts should be Array!' )

  if(!Array.isArray(schema))
    throw new Error( 'schema should be Array!' )

  return facts.filter(function (fact, index, arr) {
    [name, type, value, saved] = fact

    const cardinalityValue = findCardinality(type, schema)

    switch (cardinalityValue) {
      case 'many':
        return saved
        break
      case 'one':
        const findArr = arr.filter(function(item){
          return name === item[0] && type === item[1]
        })
        const findItem = findArr.pop()
        return saved && findItem[2] === value
        break
      default:
        throw new Error( 'schema not implement cardinality Value!' )
    }
  })

}



module.exports = findBySchema
