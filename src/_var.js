/*
  _var.js
  A javascript library for seamlessly binding variables to DOM elements and functions
  released under MIT license
  Yufei Liu (yufeiliu.com)
*/
if (typeof(_var)==="undefined") {
  var _var;
  (function() {
    bindings = {};
    _var = function() {

      if (arguments.length<1) return this.bindings;
      var vname = arguments[0];

      var self = this;
      var handler = {
        bind: function(target) {

          var triggerSingle = function(val,cur) {
            if (cur && {}.toString.call(cur)==='[object Function]') {
              cur(val);
            } else if (cur && cur.tagName && cur.nodeName) {
              cur.innerHTML = val;
            }
          }

          var trigger = function(val, vname) {
            for (var i=0; i<self.bindings[vname].length; i++) {
              var cur = self.bindings[vname][i];
              triggerSingle(val,cur);
            }
          };

          var vnames = vname.split(".");
          var base = vnames.pop();
          var obj = window;
          for (var i=0; i<vnames.length; i++) {
            obj = obj[vnames[i]];
          }

          var skip = true;
          if (typeof(self.bindings[vname])==="undefined") {
            self.bindings[vname] = [];
            skip = false;
          }

          for (var i = 0; i < self.bindings[vname].length; i++) {
            if (self.bindings[vname][i]===target) return handler;
          }

          self.bindings[vname].push(target);

          //variable already defined
          var needInit = typeof(obj[base])!=="undefined";
          if (needInit) {
            triggerSingle(obj[base], target);
          }

          if (skip) return handler;
          (function(vname, trigger) {
            var bound;
            if (needInit) bound = obj[base];
            Object.defineProperty(obj, base, {
              get: function() {return bound;},
              set: function(val) {bound = val; trigger(val, vname);}
            });
          })(vname, trigger);

          return handler;

        },
        unbind: function(target) {
          if (typeof(target)==="number") {
            self.bindings[vname].splice(target,1);
          } else {
            if (typeof(self.bindings[vname])==="undefined") return handler;
            for (var i = 0; i < self.bindings[vname].length; i++) {
              if (self.bindings[vname][i]===target) {
                self.bindings[vname].splice(i,1);
                break;
              }
            }
          }
          return handler;
        },
        bindings: self.bindings[vname]
      };

      return handler;
    };
  })();
}