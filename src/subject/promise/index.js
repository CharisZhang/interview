/**
 * es6-Promise
 */
new Promise((resolve, reject) => {
    console.log('start Promise');
    resolve(1)
}).then(
    value => {
        console.log('value', value);
    },
    reason => {
        console.log('reason', reason);
    }
)
// new Promise(1)