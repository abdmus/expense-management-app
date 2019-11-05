const promise = new Promise((resolve, reject) => {
    resolve('This is resolved');
    setTimeout(() => {
        // reject('This is rejected')
        resolve('This is resolved');

    }, 5000);
});

console.log('Before');

promise.then((data) => {
    console.log(data);

    return 'Some thing'
}).then((str) => {
    console.log('Does this run!', str);
}).catch((error) => {
    console.log('error ', error);
});

console.log('after');