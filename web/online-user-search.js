(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const namespace = require('../package.json')['open-chat-framework']['namespace'];
    window.OpenChatFramework.plugin[namespace] = require('../plugin.js');

})();

},{"../package.json":2,"../plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-online-user-search",
  "version": "0.0.1",
  "main": "./plugin.js",
  "open-chat-framework": {
    "namespace": "online-user-search"
  }
}

},{}],3:[function(require,module,exports){
module.exports = (config) => {
    
    config = config || {};
    config.field = config.field || 'username';
    config.caseSensitive = config.caseSensitive || false;

    // these are new methods that will be added to the extended class
    class extension {
      search(needle) {

          // an empty array of users we found
          var returnList = [];

          if(config.caseSensitive) {
              needle = needle.toLowerCase();
          }

          // for every user that the parent chat knows about
          for(var key in this.parent.users) {

              let haystack  = this.parent.users[key].state(this.parent);

              // see if that user username includes the input text 
              if(haystack && haystack[config.field]) {

                  haystack = haystack[config.field];

                  if(!config.caseSensitive) {
                      haystack = haystack.toLowerCase();
                  }

                  if(haystack.indexOf(needle) > -1) {

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
      namespace,
      extends: {
          Chat: extension,
          GlobalChat: extension
      }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJwbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBuYW1lc3BhY2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKVsnb3Blbi1jaGF0LWZyYW1ld29yayddWyduYW1lc3BhY2UnXTtcbiAgICB3aW5kb3cuT3BlbkNoYXRGcmFtZXdvcmsucGx1Z2luW25hbWVzcGFjZV0gPSByZXF1aXJlKCcuLi9wbHVnaW4uanMnKTtcblxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwib2NmLW9ubGluZS11c2VyLXNlYXJjaFwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcIm1haW5cIjogXCIuL3BsdWdpbi5qc1wiLFxuICBcIm9wZW4tY2hhdC1mcmFtZXdvcmtcIjoge1xuICAgIFwibmFtZXNwYWNlXCI6IFwib25saW5lLXVzZXItc2VhcmNoXCJcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSA9PiB7XG4gICAgXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICAgIGNvbmZpZy5maWVsZCA9IGNvbmZpZy5maWVsZCB8fCAndXNlcm5hbWUnO1xuICAgIGNvbmZpZy5jYXNlU2Vuc2l0aXZlID0gY29uZmlnLmNhc2VTZW5zaXRpdmUgfHwgZmFsc2U7XG5cbiAgICAvLyB0aGVzZSBhcmUgbmV3IG1ldGhvZHMgdGhhdCB3aWxsIGJlIGFkZGVkIHRvIHRoZSBleHRlbmRlZCBjbGFzc1xuICAgIGNsYXNzIGV4dGVuc2lvbiB7XG4gICAgICBzZWFyY2gobmVlZGxlKSB7XG5cbiAgICAgICAgICAvLyBhbiBlbXB0eSBhcnJheSBvZiB1c2VycyB3ZSBmb3VuZFxuICAgICAgICAgIHZhciByZXR1cm5MaXN0ID0gW107XG5cbiAgICAgICAgICBpZihjb25maWcuY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgICBuZWVkbGUgPSBuZWVkbGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBmb3IgZXZlcnkgdXNlciB0aGF0IHRoZSBwYXJlbnQgY2hhdCBrbm93cyBhYm91dFxuICAgICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMucGFyZW50LnVzZXJzKSB7XG5cbiAgICAgICAgICAgICAgbGV0IGhheXN0YWNrICA9IHRoaXMucGFyZW50LnVzZXJzW2tleV0uc3RhdGUodGhpcy5wYXJlbnQpO1xuXG4gICAgICAgICAgICAgIC8vIHNlZSBpZiB0aGF0IHVzZXIgdXNlcm5hbWUgaW5jbHVkZXMgdGhlIGlucHV0IHRleHQgXG4gICAgICAgICAgICAgIGlmKGhheXN0YWNrICYmIGhheXN0YWNrW2NvbmZpZy5maWVsZF0pIHtcblxuICAgICAgICAgICAgICAgICAgaGF5c3RhY2sgPSBoYXlzdGFja1tjb25maWcuZmllbGRdO1xuXG4gICAgICAgICAgICAgICAgICBpZighY29uZmlnLmNhc2VTZW5zaXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoYXlzdGFjayA9IGhheXN0YWNrLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmKGhheXN0YWNrLmluZGV4T2YobmVlZGxlKSA+IC0xKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBpdCBkb2VzLCBhZGQgaXQgdG8gdGhlIGxpc3Qgb2YgcmV0dXJuZWQgdXNlcnNcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm5MaXN0LnB1c2godGhpcy5wYXJlbnQudXNlcnNba2V5XSk7XG5cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmV0dXJuIGFsbCBmb3VuZCB1c2Vyc1xuICAgICAgICAgIHJldHVybiByZXR1cm5MaXN0O1xuXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYWRkIHRoaXMgcGx1Z2luIHRvIHRoZSBDaGF0IGNsYXNzZXNcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZXNwYWNlLFxuICAgICAgZXh0ZW5kczoge1xuICAgICAgICAgIENoYXQ6IGV4dGVuc2lvbixcbiAgICAgICAgICBHbG9iYWxDaGF0OiBleHRlbnNpb25cbiAgICAgIH1cbiAgICB9XG5cblxufVxuIl19
