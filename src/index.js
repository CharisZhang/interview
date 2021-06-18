Function.prototype._call = function(context) {
  // var context = context || window
  context.fn = this
  var args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments['+i+']')
  }
  eval('context.fn('+args+')')
  
}

var n = 1
function fn(m) {
  console.log('n',this.n);
  console.log('m',m);
}
var obj = {
  n: 2
}
// fn(22)
fn._call()
// fn.apply(obj,[22])