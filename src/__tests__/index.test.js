const findBySchema = require("../index")

describe("findBySchema(facts, schema)", ( ) => {
  const facts = [
    ['gabriel', 'endereço', 'av rio branco, 109', true],
    ['joão', 'endereço', 'rua alice, 10', true],
    ['joão', 'endereço', 'rua bob, 88', true],
    ['joão', 'telefone', '234-5678', true],
    ['joão', 'telefone', '91234-5555', true],
    ['joão', 'telefone', '234-5678', false],
    ['gabriel', 'telefone', '98888-1111', true],
    ['gabriel', 'telefone', '56789-1010', true],
  ]

  const schema = [
      ['endereço', 'cardinality', 'one'],
      ['telefone', 'cardinality', 'many']
  ]

  it("is a Function", ( ) => {
      expect( findBySchema ).toBeInstanceOf( Function )
  })

  it("facts should be Array", ( ) => {

    expect(( ) => findBySchema(null, schema)).toThrow( )
  })

  it("facts not Array error message should be", ( ) => {
      expect(( ) => findBySchema(null, schema)).toThrowError( "facts should be Array!" )
  })

  it("schema should be Array", ( ) => {

    expect(( ) => findBySchema(facts, null)).toThrow( )
  })

  it("schema not Array error message should be", ( ) => {
      expect(( ) => findBySchema(facts, null)).toThrowError( "schema should be Array!" )
  })

  it("schema not implement cardinality Value should be", ( ) => {
    const schemaErro = [
        ['endereço', 'cardinality', 'test'],
    ]
    expect(( ) => findBySchema(facts, schemaErro)).toThrowError( "schema not implement cardinality Value!" )
  })

  it("Should return facts by schema", ( ) => {
    const expected = [
      ['gabriel', 'endereço', 'av rio branco, 109', true],
      ['joão', 'endereço', 'rua bob, 88', true],
      ['joão', 'telefone', '91234-5555', true],
      ['gabriel', 'telefone', '98888-1111', true],
      ['gabriel', 'telefone', '56789-1010', true]
    ]

    expect(findBySchema(facts, schema)).toEqual( expected )
  })
})
