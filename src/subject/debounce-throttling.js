
/**
 * 实现 防抖(debounce) 和 节流(throttling)
 */
var count = 1
var container = document.getElementById('container')
function getUserAction(e) {
  console.log(e)
  container.innerHTML = count++
}

// container.onmousemove = getUserAction
container.onmousemove = debounce(getUserAction, 1000)
function debounce(fn, delay, immediate) {
  var timeout
  return function () {
    let _this = this
    let args = arguments
    if(timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过不再执行
      var callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay);
      if (callNow) fn.apply(_this,args)
    }else{
      timeout = setTimeout(function () {
        fn.apply(_this, args)
      }, delay)
    }
    
  }
}
function thor(fn,delay) {
  var _this, args
  var previous = 0
  return function() {
    var now = +new Date()
    _this = this
    args = arguments
    if (now - previous > delay) {
      fn.apply(this,args)
      previous = now
    }
  }
}
