//Assertivas de igualdade
it('Igualdade', () => {
    const a = 1
    const b = null

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.eq(1);
    expect(a).not.to.be.eq(b);

});

//Assertiva para Verdadeiro ou Falso
it('Verdadeiro ou falso', () => {
    const x = true
    const y = null

    expect(x).to.be.true
    expect(x).not.to.be.eq(null)
    expect(true).to.be.true
    expect(y).to.be.eq(null)
    expect(y).not.be.eq(true)

});

//Assertiva com Objetos
it('Igualdade de Objeto', () => {
    const objeto = {
        x: 7,
        y: 17
    }
    
    expect(objeto).to.be.eq(objeto)
    expect(objeto).not.be.eq(null)
    expect(objeto).to.be.deep.eq({x: 7, y: 17})
    expect(objeto).include({x:7})
    expect(objeto).to.have.property('x')
    expect(objeto).to.have.property('x', 7)
    expect(objeto).not.to.be.empty
});

//Assertivas com Array
it('Array', () => {
    const array = [1,2,3]

    expect(array).to.have.members([1,2,3])
    expect(array).to.include.members([3])
    expect(array).not.to.be.empty

});

//Assertivas com tipos de elementos 
it('Tipos', () => {
    const num = 1
    const stg = 'Teste'

    expect(stg).to.be.eq('Teste')
    expect(stg).to.be.a('string')
    expect(num).to.be.a('number')
    expect([]).to.be.a('array')
    expect({}).to.be.a('object')
});

//Assertiva com Strings
it('Strings', () => {
    const stg = 'Testando as assertivas'

    expect(stg).to.be.eq('Testando as assertivas')
    expect(stg).to.have.length(22)
    expect(stg).to.contains('as')
    expect(stg).to.match(/as/)
    expect(stg).to.match(/Testando/)
    expect(stg).to.match(/^Testando/)
    expect(stg).to.match(/Testando/)

});
