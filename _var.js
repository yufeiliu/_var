/*
  _var.js
  A javascript library for seamlessly binding variables to DOM elements and functions
  released under MIT license
  Yufei Liu (yufeiliu.com)
*/

if (typeof(_var)==="undefined") {
  var _var = {};
  (function() {
    bindings = {};
    _var = function() {
      var ar = [];
      for (var i=0; i<arguments.length; i++) ar.push(arguments[i]);

      if (ar.length<1) return this.bindings;
      var vname = ar.shift();
      if (ar.length<1) return (this.bindings)[vname];

      var trigger = function(val, vname) {
        for (var i=0; i<bindings[vname].length; i++) {
          var cur = bindings[vname][i];
          if (cur && {}.toString.call(cur)==='[object Function]') {
            cur(val);
          } else if (cur && cur.tagName && cur.nodeName) {
            cur.innerHTML = val;
          }
        }
      };

      var vnames = vname.split(".");
      var base = vnames.pop();
      var obj = window;
      for (var i=0; i<vnames.length; i++) {
        obj = obj[vnames[i]];
      }

      var skip = true;
      if (typeof(bindings[vname])==="undefined") {
        bindings[vname] = [];
        skip = false;
      }
      for (var i=0; i<ar.length; i++) {
        var cur = ar[i];

        if (cur.constructor.toString().indexOf("Array") !== -1) {
          for (var j=0; j<cur.length; j++) {
             bindings[vname].push(cur[j]);
          }
        } else {
           bindings[vname].push(cur);
        }
      }

      var needInit = typeof(obj[base])!=="undefined";
      if (needInit) {
        console.log(bindings[vname]);
        trigger(obj[base], vname);
      }

      if (skip) return;
      (function(vname, trigger) {
        var bound;
        if (needInit) bound = obj[base];
        Object.defineProperty(obj, base, {
          get: function() {return bound;},
          set: function(val) {bound = val; trigger(val, vname);}
        });
      })(vname, trigger);
    };
  })();
}