it('Sem teste', () => {

});

//Trabalhando com elementos assíncronos usando callback

const getSomething = callback => {
    setTimeout(() => {
        callback(12)
    });
}

const system = () => {
    console.log('init')
    getSomething(some => {
        console.log(`something is ${some}`)
        console.log('end')
    });
    
}

system();

//Trabalhando com elementos assíncronos utilizando Promise

const gettSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(12)
        }, 1000);
    })

}

const systen = () => {
    console.log('init')
    gettSomething().then(some => {
        console.log(`something is ${some}`)
        console.log('end')
    })
};
    

systen();