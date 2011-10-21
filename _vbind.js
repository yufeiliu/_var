var _vbind = function() {
  var ar=arguments;
  if (ar.length<1) return this.bindings;
  var vname = ar.shift;
  if (ar.length<1) return (this.bindings)[vname];

  var targets = [];
  for (var i=0; i<ar.length; i++) {
    var cur = ar[i];
    if (cur.constructor.toString().indexOf(”Array”) != -1) {
      for (var j=0; j<cur.length; j++) targets.push(cur[j]);
    } else {
      targets.push(cur);
    }
  }

  for (var i=0; i<targets.length; i++) {
    var target = targets[i];

  }
  this.bindings =
};