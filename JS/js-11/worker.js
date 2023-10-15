// Checks whether the given number is prime or not.
function isPrime(number) {
    if (number < 2) {
        return false;
    }
    
    if (number === 2) {
        return true;
    }
    
    if (number % 2 === 0) {
        return false;
    }
    
    let sqrt = Math.sqrt(number);
    
    for (let i = 3; i <= sqrt; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }
    
    return true;
}


/** Creates an array of prime numbers until the @param limit.
 * Example: 2,3,5,7 where limi is 9.
*/
function constructPrime(limit) {
    const arr = [];
    for (i = 2; i <= limit; i++) {
        if (isPrime(i)) {
            arr.push(i);
        }
    }    
    return arr;
}

addEventListener("message", (message) => {
    if (message.data.command == "generatePrime") {
        const result = constructPrime(message.data.quota);
        postMessage(result);
    }
})