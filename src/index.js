let str = ' 11 12323  123 '
function trim(s) {
  return s.replace(/^\s\s*/,'').replace(/\s\s*$/,'')
  return s.replace(/^\s+|\s+$/g,'')
}

String.prototype.trim =function() {
  return this.replace(/^\s+|\s+$/g,'')
}
console.log(str.trim());
