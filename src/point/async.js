const logTime = (name) => {
  console.log(`Log....${name} - ` + new Date().toLocaleTimeString())
}
const callback = () => {
  setTimeout(() => {
    logTime('callback 1')
    setTimeout(() => {
      logTime('callback 2')
    }, 100)
  }, 100)
}

const promise = (name, delay = 100) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === 'Promise 2') {
        console.log('reject-' + name)
        reject('err')
      } else {
        console.log('resolve-' + name)
        resolve()
      }
    }, delay)
  })
const _promise = () => {
  promise('Promise 1')
    .then(
      promise('Promise 2').catch((err) => {
        console.log(err)
      })
    )
    .then(promise('Promise 3'))
    .then(promise('Promise 4'))
}

// function* func(){
//     console.log('gener 1');
//     yield '1'
//     console.log('gener 2');
//     yield '2'
//     console.log('gener 3');
//     yield '3'
//     return '4'
// }
// const f = func()
// f.next()
// f.next()
// f.next()
// f.next()

// // // 迭代器
// for(const [key,value] of func()){
//     console.log(`${key}: ${value}`);
// }
// // 逻辑代码
// let co = function(gen,name) {
//     var it = gen(name)
//     var ret = it.next()
//     ret.value.then(function(res) {
//         it.next(res)
//     })
// }
const generator = () => {
  const generator = function* (name) {
    yield promise(name + 1)
    yield promise(name + 2)
    yield promise(name + 3)
    yield promise(name + 4)
  }
  let co = (generator) => {
    if ((it = generator.next().value)) {
      it.then((res) => {
        co(generator)
      })
    } else {
      return
    }
  }
  co(generator('Co-Generator'))
}
const asyncAwait = async () => {
  await promise('async/await1')
  await promise('async/await2')
  await promise('async/await3')
  await promise('async/await4')
}
// 订阅发布机制
const event = async () => {
  const asyncFun = (name) => (event) => {
    setTimeout(() => {
      logTime(name)
      event.emit('end')
    }, 100)
    return event
  }
  const arr = [asyncFun('event1'), asyncFun('event2'), asyncFun('event3')]
  const { EventEmitter } = require('events')
  const event = new EventEmitter()
  let i = 0
  event.on('end', () => i < arr.length && arr[i++](event))
  event.emit('end')
}
_promise()
