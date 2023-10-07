// callback

function doSomething1(init, callback) {
    let result = init + 1;
    callback(result);
}

function doSomething2(init, callback) {
    let result = init + 2;
    callback(result);
}

function doSomething3(init, callback) {
    let result = init + 3;
    callback(result);
}

doSomething1(0, (result1) => {
    doSomething2(result1, (result2) => {
        doSomething3(result2, (result3) => {
            console.log(result3);
        })
    })
})

