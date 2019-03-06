(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.ChatEngineCore.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":3,"../src/plugin.js":4}],2:[function(require,module,exports){
//
// Dotty makes it easy to programmatically access arbitrarily nested objects and
// their properties.
//

//
// `object` is an object, `path` is the path to the property you want to check
// for existence of.
//
// `path` can be provided as either a `"string.separated.with.dots"` or as
// `["an", "array"]`.
//
// Returns `true` if the path can be completely resolved, `false` otherwise.
//

var exists = module.exports.exists = function exists(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    return Object.hasOwnProperty.apply(object, [key]);
  } else {
    return exists(object[key], path);
  }
};

//
// These arguments are the same as those for `exists`.
//
// The return value, however, is the property you're trying to access, or
// `undefined` if it can't be found. This means you won't be able to tell
// the difference between an unresolved path and an undefined property, so you 
// should not use `get` to check for the existence of a property. Use `exists`
// instead.
//

var get = module.exports.get = function get(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return;
  }

  if (path.length === 0) {
    return object[key];
  }

  if (path.length) {
    return get(object[key], path);
  }
};

//
// Arguments are similar to `exists` and `get`, with the exception that path
// components are regexes with some special cases. If a path component is `"*"`
// on its own, it'll be converted to `/.*/`.
//
// The return value is an array of values where the key path matches the
// specified criterion. If none match, an empty array will be returned.
//

var search = module.exports.search = function search(object, path) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return;
  }

  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return;
  }

  if (key === "*") {
    key = ".*";
  }

  if (typeof key === "string") {
    key = new RegExp(key);
  }

  if (path.length === 0) {
    return Object.keys(object).filter(key.test.bind(key)).map(function(k) { return object[k]; });
  } else {
    return Array.prototype.concat.apply([], Object.keys(object).filter(key.test.bind(key)).map(function(k) { return search(object[k], path); }));
  }
};

//
// The first two arguments for `put` are the same as `exists` and `get`.
//
// The third argument is a value to `put` at the `path` of the `object`.
// Objects in the middle will be created if they don't exist, or added to if
// they do. If a value is encountered in the middle of the path that is *not*
// an object, it will not be overwritten.
//
// The return value is `true` in the case that the value was `put`
// successfully, or `false` otherwise.
//

var put = module.exports.put = function put(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }
  
  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    object[key] = value;
  } else {
    if (typeof object[key] === "undefined") {
      object[key] = {};
    }

    if (typeof object[key] !== "object" || object[key] === null) {
      return false;
    }

    return put(object[key], path, value);
  }
};

//
// `remove` is like `put` in reverse!
//
// The return value is `true` in the case that the value existed and was removed
// successfully, or `false` otherwise.
//

var remove = module.exports.remove = function remove(object, path, value) {
  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!(path instanceof Array) || path.length === 0) {
    return false;
  }
  
  path = path.slice();

  var key = path.shift();

  if (typeof object !== "object" || object === null) {
    return false;
  }

  if (path.length === 0) {
    if (!Object.hasOwnProperty.call(object, key)) {
      return false;
    }

    delete object[key];

    return true;
  } else {
    return remove(object[key], path, value);
  }
};

//
// `deepKeys` creates a list of all possible key paths for a given object.
//
// The return value is always an array, the members of which are paths in array
// format. If you want them in dot-notation format, do something like this:
//
// ```js
// dotty.deepKeys(obj).map(function(e) {
//   return e.join(".");
// });
// ```
//
// *Note: this will probably explode on recursive objects. Be careful.*
//

var deepKeys = module.exports.deepKeys = function deepKeys(object, prefix) {
  if (typeof prefix === "undefined") {
    prefix = [];
  }

  var keys = [];

  for (var k in object) {
    if (!Object.hasOwnProperty.call(object, k)) {
      continue;
    }

    keys.push(prefix.concat([k]));

    if (typeof object[k] === "object" && object[k] !== null) {
      keys = keys.concat(deepKeys(object[k], prefix.concat([k])));
    }
  }

  return keys;
};

},{}],3:[function(require,module,exports){
module.exports={
  "author": "Ian Jennings",
  "name": "chat-engine-online-user-search",
  "version": "0.0.11",
  "main": "src/plugin.js",
  "dependencies": {
    "chat-engine": "^0.9.21",
    "dotty": "0.0.2"
  }
}

},{}],4:[function(require,module,exports){
/**
* Searches a {@link Chat} for a {@link User} with a ```state.username``` containing a given string.
* @module chat-engine-online-user-search
*/

const dotty = require('dotty');

/**
* @function
* @param {Object} [config] The config object
* @example
* //providing a config is optional, the defaults are below
* let config = { prop: 'uuid', caseSensitive: false }
* chat.plugin(ChatEngineCore.plugin['chat-engine-online-user-search'](config));
*
* let results = chat.onlineUserSearch.search('foo');
*/
module.exports = (config) => {

    config = config || {};
    config.prop = config.prop || 'uuid';
    config.caseSensitive = config.caseSensitive || false;

    // these are new methods that will be added to the extended class

    /**
    * @method  search
    * @ceextends Chat
    * @param {String} needle The username to search for.
    * @returns {Array} An array of {@link User}s that match the input string.
    */
    class extension {
      search(needle) {

          // an empty array of users we found
          var returnList = [];

          if(!config.caseSensitive) {
              needle = needle.toLowerCase();
          }

          // for every user that the parent chat knows about
          for(var key in this.parent.users) {

              let haystack  = this.parent.users[key];
              let target = dotty.get(haystack, config.prop);

              // see if that user username includes the input text
              if(haystack && target) {

                  if(!config.caseSensitive) {
                      target = target.toLowerCase();
                  }

                  if(target.indexOf(needle) > -1) {

                      // if it does, add it to the list of returned users
                      returnList.push(this.parent.users[key]);

                  }
              }

          }

          // return all found users
          return returnList;

      }
    }

    // add this plugin to the Chat classes
    return {
      namespace: 'onlineUserSearch',
      extends: {
        Chat: extension,
        GlobalChat: extension
      }
    }


}

},{"dotty":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2NoYXQtZW5naW5lLXBsdWdpbi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiLnRtcC93cmFwLmpzIiwibm9kZV9tb2R1bGVzL2RvdHR5L2xpYi9pbmRleC5qcyIsInBhY2thZ2UuanNvbiIsInNyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBwYWNrYWdlID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJyk7XG4gICAgd2luZG93LkNoYXRFbmdpbmVDb3JlLnBsdWdpbltwYWNrYWdlLm5hbWVdID0gcmVxdWlyZSgnLi4vc3JjL3BsdWdpbi5qcycpO1xuXG59KSgpO1xuIiwiLy9cbi8vIERvdHR5IG1ha2VzIGl0IGVhc3kgdG8gcHJvZ3JhbW1hdGljYWxseSBhY2Nlc3MgYXJiaXRyYXJpbHkgbmVzdGVkIG9iamVjdHMgYW5kXG4vLyB0aGVpciBwcm9wZXJ0aWVzLlxuLy9cblxuLy9cbi8vIGBvYmplY3RgIGlzIGFuIG9iamVjdCwgYHBhdGhgIGlzIHRoZSBwYXRoIHRvIHRoZSBwcm9wZXJ0eSB5b3Ugd2FudCB0byBjaGVja1xuLy8gZm9yIGV4aXN0ZW5jZSBvZi5cbi8vXG4vLyBgcGF0aGAgY2FuIGJlIHByb3ZpZGVkIGFzIGVpdGhlciBhIGBcInN0cmluZy5zZXBhcmF0ZWQud2l0aC5kb3RzXCJgIG9yIGFzXG4vLyBgW1wiYW5cIiwgXCJhcnJheVwiXWAuXG4vL1xuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHBhdGggY2FuIGJlIGNvbXBsZXRlbHkgcmVzb2x2ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlLlxuLy9cblxudmFyIGV4aXN0cyA9IG1vZHVsZS5leHBvcnRzLmV4aXN0cyA9IGZ1bmN0aW9uIGV4aXN0cyhvYmplY3QsIHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gT2JqZWN0Lmhhc093blByb3BlcnR5LmFwcGx5KG9iamVjdCwgW2tleV0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBleGlzdHMob2JqZWN0W2tleV0sIHBhdGgpO1xuICB9XG59O1xuXG4vL1xuLy8gVGhlc2UgYXJndW1lbnRzIGFyZSB0aGUgc2FtZSBhcyB0aG9zZSBmb3IgYGV4aXN0c2AuXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSwgaG93ZXZlciwgaXMgdGhlIHByb3BlcnR5IHlvdSdyZSB0cnlpbmcgdG8gYWNjZXNzLCBvclxuLy8gYHVuZGVmaW5lZGAgaWYgaXQgY2FuJ3QgYmUgZm91bmQuIFRoaXMgbWVhbnMgeW91IHdvbid0IGJlIGFibGUgdG8gdGVsbFxuLy8gdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhbiB1bnJlc29sdmVkIHBhdGggYW5kIGFuIHVuZGVmaW5lZCBwcm9wZXJ0eSwgc28geW91IFxuLy8gc2hvdWxkIG5vdCB1c2UgYGdldGAgdG8gY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSBwcm9wZXJ0eS4gVXNlIGBleGlzdHNgXG4vLyBpbnN0ZWFkLlxuLy9cblxudmFyIGdldCA9IG1vZHVsZS5leHBvcnRzLmdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKSB7XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoXCIuXCIpO1xuICB9XG5cbiAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqZWN0W2tleV07XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGgpIHtcbiAgICByZXR1cm4gZ2V0KG9iamVjdFtrZXldLCBwYXRoKTtcbiAgfVxufTtcblxuLy9cbi8vIEFyZ3VtZW50cyBhcmUgc2ltaWxhciB0byBgZXhpc3RzYCBhbmQgYGdldGAsIHdpdGggdGhlIGV4Y2VwdGlvbiB0aGF0IHBhdGhcbi8vIGNvbXBvbmVudHMgYXJlIHJlZ2V4ZXMgd2l0aCBzb21lIHNwZWNpYWwgY2FzZXMuIElmIGEgcGF0aCBjb21wb25lbnQgaXMgYFwiKlwiYFxuLy8gb24gaXRzIG93biwgaXQnbGwgYmUgY29udmVydGVkIHRvIGAvLiovYC5cbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGFuIGFycmF5IG9mIHZhbHVlcyB3aGVyZSB0aGUga2V5IHBhdGggbWF0Y2hlcyB0aGVcbi8vIHNwZWNpZmllZCBjcml0ZXJpb24uIElmIG5vbmUgbWF0Y2gsIGFuIGVtcHR5IGFycmF5IHdpbGwgYmUgcmV0dXJuZWQuXG4vL1xuXG52YXIgc2VhcmNoID0gbW9kdWxlLmV4cG9ydHMuc2VhcmNoID0gZnVuY3Rpb24gc2VhcmNoKG9iamVjdCwgcGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcGF0aCA9IHBhdGguc2xpY2UoKTtcblxuICB2YXIga2V5ID0gcGF0aC5zaGlmdCgpO1xuXG4gIGlmICh0eXBlb2Ygb2JqZWN0ICE9PSBcIm9iamVjdFwiIHx8IG9iamVjdCA9PT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChrZXkgPT09IFwiKlwiKSB7XG4gICAga2V5ID0gXCIuKlwiO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcbiAgICBrZXkgPSBuZXcgUmVnRXhwKGtleSk7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5maWx0ZXIoa2V5LnRlc3QuYmluZChrZXkpKS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gb2JqZWN0W2tdOyB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgT2JqZWN0LmtleXMob2JqZWN0KS5maWx0ZXIoa2V5LnRlc3QuYmluZChrZXkpKS5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gc2VhcmNoKG9iamVjdFtrXSwgcGF0aCk7IH0pKTtcbiAgfVxufTtcblxuLy9cbi8vIFRoZSBmaXJzdCB0d28gYXJndW1lbnRzIGZvciBgcHV0YCBhcmUgdGhlIHNhbWUgYXMgYGV4aXN0c2AgYW5kIGBnZXRgLlxuLy9cbi8vIFRoZSB0aGlyZCBhcmd1bWVudCBpcyBhIHZhbHVlIHRvIGBwdXRgIGF0IHRoZSBgcGF0aGAgb2YgdGhlIGBvYmplY3RgLlxuLy8gT2JqZWN0cyBpbiB0aGUgbWlkZGxlIHdpbGwgYmUgY3JlYXRlZCBpZiB0aGV5IGRvbid0IGV4aXN0LCBvciBhZGRlZCB0byBpZlxuLy8gdGhleSBkby4gSWYgYSB2YWx1ZSBpcyBlbmNvdW50ZXJlZCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXRoIHRoYXQgaXMgKm5vdCpcbi8vIGFuIG9iamVjdCwgaXQgd2lsbCBub3QgYmUgb3ZlcndyaXR0ZW4uXG4vL1xuLy8gVGhlIHJldHVybiB2YWx1ZSBpcyBgdHJ1ZWAgaW4gdGhlIGNhc2UgdGhhdCB0aGUgdmFsdWUgd2FzIGBwdXRgXG4vLyBzdWNjZXNzZnVsbHksIG9yIGBmYWxzZWAgb3RoZXJ3aXNlLlxuLy9cblxudmFyIHB1dCA9IG1vZHVsZS5leHBvcnRzLnB1dCA9IGZ1bmN0aW9uIHB1dChvYmplY3QsIHBhdGgsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIikge1xuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgfVxuXG4gIGlmICghKHBhdGggaW5zdGFuY2VvZiBBcnJheSkgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIHBhdGggPSBwYXRoLnNsaWNlKCk7XG5cbiAgdmFyIGtleSA9IHBhdGguc2hpZnQoKTtcblxuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0W2tleV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9iamVjdFtrZXldID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmplY3Rba2V5XSAhPT0gXCJvYmplY3RcIiB8fCBvYmplY3Rba2V5XSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBwdXQob2JqZWN0W2tleV0sIHBhdGgsIHZhbHVlKTtcbiAgfVxufTtcblxuLy9cbi8vIGByZW1vdmVgIGlzIGxpa2UgYHB1dGAgaW4gcmV2ZXJzZSFcbi8vXG4vLyBUaGUgcmV0dXJuIHZhbHVlIGlzIGB0cnVlYCBpbiB0aGUgY2FzZSB0aGF0IHRoZSB2YWx1ZSBleGlzdGVkIGFuZCB3YXMgcmVtb3ZlZFxuLy8gc3VjY2Vzc2Z1bGx5LCBvciBgZmFsc2VgIG90aGVyd2lzZS5cbi8vXG5cbnZhciByZW1vdmUgPSBtb2R1bGUuZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUob2JqZWN0LCBwYXRoLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHBhdGggPT09IFwic3RyaW5nXCIpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdChcIi5cIik7XG4gIH1cblxuICBpZiAoIShwYXRoIGluc3RhbmNlb2YgQXJyYXkpIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxuICBwYXRoID0gcGF0aC5zbGljZSgpO1xuXG4gIHZhciBrZXkgPSBwYXRoLnNoaWZ0KCk7XG5cbiAgaWYgKHR5cGVvZiBvYmplY3QgIT09IFwib2JqZWN0XCIgfHwgb2JqZWN0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKCFPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBkZWxldGUgb2JqZWN0W2tleV07XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcmVtb3ZlKG9iamVjdFtrZXldLCBwYXRoLCB2YWx1ZSk7XG4gIH1cbn07XG5cbi8vXG4vLyBgZGVlcEtleXNgIGNyZWF0ZXMgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSBrZXkgcGF0aHMgZm9yIGEgZ2l2ZW4gb2JqZWN0LlxuLy9cbi8vIFRoZSByZXR1cm4gdmFsdWUgaXMgYWx3YXlzIGFuIGFycmF5LCB0aGUgbWVtYmVycyBvZiB3aGljaCBhcmUgcGF0aHMgaW4gYXJyYXlcbi8vIGZvcm1hdC4gSWYgeW91IHdhbnQgdGhlbSBpbiBkb3Qtbm90YXRpb24gZm9ybWF0LCBkbyBzb21ldGhpbmcgbGlrZSB0aGlzOlxuLy9cbi8vIGBgYGpzXG4vLyBkb3R0eS5kZWVwS2V5cyhvYmopLm1hcChmdW5jdGlvbihlKSB7XG4vLyAgIHJldHVybiBlLmpvaW4oXCIuXCIpO1xuLy8gfSk7XG4vLyBgYGBcbi8vXG4vLyAqTm90ZTogdGhpcyB3aWxsIHByb2JhYmx5IGV4cGxvZGUgb24gcmVjdXJzaXZlIG9iamVjdHMuIEJlIGNhcmVmdWwuKlxuLy9cblxudmFyIGRlZXBLZXlzID0gbW9kdWxlLmV4cG9ydHMuZGVlcEtleXMgPSBmdW5jdGlvbiBkZWVwS2V5cyhvYmplY3QsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIHByZWZpeCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHByZWZpeCA9IFtdO1xuICB9XG5cbiAgdmFyIGtleXMgPSBbXTtcblxuICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgIGlmICghT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAga2V5cy5wdXNoKHByZWZpeC5jb25jYXQoW2tdKSk7XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdFtrXSA9PT0gXCJvYmplY3RcIiAmJiBvYmplY3Rba10gIT09IG51bGwpIHtcbiAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChkZWVwS2V5cyhvYmplY3Rba10sIHByZWZpeC5jb25jYXQoW2tdKSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBrZXlzO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJhdXRob3JcIjogXCJJYW4gSmVubmluZ3NcIixcbiAgXCJuYW1lXCI6IFwiY2hhdC1lbmdpbmUtb25saW5lLXVzZXItc2VhcmNoXCIsXG4gIFwidmVyc2lvblwiOiBcIjAuMC4xMVwiLFxuICBcIm1haW5cIjogXCJzcmMvcGx1Z2luLmpzXCIsXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNoYXQtZW5naW5lXCI6IFwiXjAuOS4yMVwiLFxuICAgIFwiZG90dHlcIjogXCIwLjAuMlwiXG4gIH1cbn1cbiIsIi8qKlxuKiBTZWFyY2hlcyBhIHtAbGluayBDaGF0fSBmb3IgYSB7QGxpbmsgVXNlcn0gd2l0aCBhIGBgYHN0YXRlLnVzZXJuYW1lYGBgIGNvbnRhaW5pbmcgYSBnaXZlbiBzdHJpbmcuXG4qIEBtb2R1bGUgY2hhdC1lbmdpbmUtb25saW5lLXVzZXItc2VhcmNoXG4qL1xuXG5jb25zdCBkb3R0eSA9IHJlcXVpcmUoJ2RvdHR5Jyk7XG5cbi8qKlxuKiBAZnVuY3Rpb25cbiogQHBhcmFtIHtPYmplY3R9IFtjb25maWddIFRoZSBjb25maWcgb2JqZWN0XG4qIEBleGFtcGxlXG4qIC8vcHJvdmlkaW5nIGEgY29uZmlnIGlzIG9wdGlvbmFsLCB0aGUgZGVmYXVsdHMgYXJlIGJlbG93XG4qIGxldCBjb25maWcgPSB7IHByb3A6ICd1dWlkJywgY2FzZVNlbnNpdGl2ZTogZmFsc2UgfVxuKiBjaGF0LnBsdWdpbihDaGF0RW5naW5lQ29yZS5wbHVnaW5bJ2NoYXQtZW5naW5lLW9ubGluZS11c2VyLXNlYXJjaCddKGNvbmZpZykpO1xuKlxuKiBsZXQgcmVzdWx0cyA9IGNoYXQub25saW5lVXNlclNlYXJjaC5zZWFyY2goJ2ZvbycpO1xuKi9cbm1vZHVsZS5leHBvcnRzID0gKGNvbmZpZykgPT4ge1xuXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy5wcm9wID0gY29uZmlnLnByb3AgfHwgJ3V1aWQnO1xuICAgIGNvbmZpZy5jYXNlU2Vuc2l0aXZlID0gY29uZmlnLmNhc2VTZW5zaXRpdmUgfHwgZmFsc2U7XG5cbiAgICAvLyB0aGVzZSBhcmUgbmV3IG1ldGhvZHMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBleHRlbmRlZCBjbGFzc1xuXG4gICAgLyoqXG4gICAgKiBAbWV0aG9kICBzZWFyY2hcbiAgICAqIEBjZWV4dGVuZHMgQ2hhdFxuICAgICogQHBhcmFtIHtTdHJpbmd9IG5lZWRsZSBUaGUgdXNlcm5hbWUgdG8gc2VhcmNoIGZvci5cbiAgICAqIEByZXR1cm5zIHtBcnJheX0gQW4gYXJyYXkgb2Yge0BsaW5rIFVzZXJ9cyB0aGF0IG1hdGNoIHRoZSBpbnB1dCBzdHJpbmcuXG4gICAgKi9cbiAgICBjbGFzcyBleHRlbnNpb24ge1xuICAgICAgc2VhcmNoKG5lZWRsZSkge1xuXG4gICAgICAgICAgLy8gYW4gZW1wdHkgYXJyYXkgb2YgdXNlcnMgd2UgZm91bmRcbiAgICAgICAgICB2YXIgcmV0dXJuTGlzdCA9IFtdO1xuXG4gICAgICAgICAgaWYoIWNvbmZpZy5jYXNlU2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IG5lZWRsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGZvciBldmVyeSB1c2VyIHRoYXQgdGhlIHBhcmVudCBjaGF0IGtub3dzIGFib3V0XG4gICAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5wYXJlbnQudXNlcnMpIHtcblxuICAgICAgICAgICAgICBsZXQgaGF5c3RhY2sgID0gdGhpcy5wYXJlbnQudXNlcnNba2V5XTtcbiAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGRvdHR5LmdldChoYXlzdGFjaywgY29uZmlnLnByb3ApO1xuXG4gICAgICAgICAgICAgIC8vIHNlZSBpZiB0aGF0IHVzZXIgdXNlcm5hbWUgaW5jbHVkZXMgdGhlIGlucHV0IHRleHRcbiAgICAgICAgICAgICAgaWYoaGF5c3RhY2sgJiYgdGFyZ2V0KSB7XG5cbiAgICAgICAgICAgICAgICAgIGlmKCFjb25maWcuY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZih0YXJnZXQuaW5kZXhPZihuZWVkbGUpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGRvZXMsIGFkZCBpdCB0byB0aGUgbGlzdCBvZiByZXR1cm5lZCB1c2Vyc1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybkxpc3QucHVzaCh0aGlzLnBhcmVudC51c2Vyc1trZXldKTtcblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXR1cm4gYWxsIGZvdW5kIHVzZXJzXG4gICAgICAgICAgcmV0dXJuIHJldHVybkxpc3Q7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgdGhpcyBwbHVnaW4gdG8gdGhlIENoYXQgY2xhc3Nlc1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lc3BhY2U6ICdvbmxpbmVVc2VyU2VhcmNoJyxcbiAgICAgIGV4dGVuZHM6IHtcbiAgICAgICAgQ2hhdDogZXh0ZW5zaW9uLFxuICAgICAgICBHbG9iYWxDaGF0OiBleHRlbnNpb25cbiAgICAgIH1cbiAgICB9XG5cblxufVxuIl19
