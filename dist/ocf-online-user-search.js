(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {

    const package = require('../package.json');
    window.OpenChatFramework.plugin[package.name] = require('../src/plugin.js');

})();

},{"../package.json":2,"../src/plugin.js":3}],2:[function(require,module,exports){
module.exports={
  "name": "ocf-online-user-search",
  "version": "0.0.1",
  "main": "src/plugin.js",
  "dependencies": {
    "ocf": "^0.0.4"
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
      extends: {
          Chat: extension,
          GlobalChat: extension
      }
    }


}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni43LjAvbGliL25vZGVfbW9kdWxlcy9vY2YtcGx1Z2luL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL3dyYXAuanMiLCJwYWNrYWdlLmpzb24iLCJzcmMvcGx1Z2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICB3aW5kb3cuT3BlbkNoYXRGcmFtZXdvcmsucGx1Z2luW3BhY2thZ2UubmFtZV0gPSByZXF1aXJlKCcuLi9zcmMvcGx1Z2luLmpzJyk7XG5cbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwibmFtZVwiOiBcIm9jZi1vbmxpbmUtdXNlci1zZWFyY2hcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJtYWluXCI6IFwic3JjL3BsdWdpbi5qc1wiLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJvY2ZcIjogXCJeMC4wLjRcIlxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IChjb25maWcpID0+IHtcbiAgICBcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgY29uZmlnLmZpZWxkID0gY29uZmlnLmZpZWxkIHx8ICd1c2VybmFtZSc7XG4gICAgY29uZmlnLmNhc2VTZW5zaXRpdmUgPSBjb25maWcuY2FzZVNlbnNpdGl2ZSB8fCBmYWxzZTtcblxuICAgIC8vIHRoZXNlIGFyZSBuZXcgbWV0aG9kcyB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIGV4dGVuZGVkIGNsYXNzXG4gICAgY2xhc3MgZXh0ZW5zaW9uIHtcbiAgICAgIHNlYXJjaChuZWVkbGUpIHtcblxuICAgICAgICAgIC8vIGFuIGVtcHR5IGFycmF5IG9mIHVzZXJzIHdlIGZvdW5kXG4gICAgICAgICAgdmFyIHJldHVybkxpc3QgPSBbXTtcblxuICAgICAgICAgIGlmKGNvbmZpZy5jYXNlU2Vuc2l0aXZlKSB7XG4gICAgICAgICAgICAgIG5lZWRsZSA9IG5lZWRsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGZvciBldmVyeSB1c2VyIHRoYXQgdGhlIHBhcmVudCBjaGF0IGtub3dzIGFib3V0XG4gICAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5wYXJlbnQudXNlcnMpIHtcblxuICAgICAgICAgICAgICBsZXQgaGF5c3RhY2sgID0gdGhpcy5wYXJlbnQudXNlcnNba2V5XS5zdGF0ZSh0aGlzLnBhcmVudCk7XG5cbiAgICAgICAgICAgICAgLy8gc2VlIGlmIHRoYXQgdXNlciB1c2VybmFtZSBpbmNsdWRlcyB0aGUgaW5wdXQgdGV4dCBcbiAgICAgICAgICAgICAgaWYoaGF5c3RhY2sgJiYgaGF5c3RhY2tbY29uZmlnLmZpZWxkXSkge1xuXG4gICAgICAgICAgICAgICAgICBoYXlzdGFjayA9IGhheXN0YWNrW2NvbmZpZy5maWVsZF07XG5cbiAgICAgICAgICAgICAgICAgIGlmKCFjb25maWcuY2FzZVNlbnNpdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGhheXN0YWNrID0gaGF5c3RhY2sudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYoaGF5c3RhY2suaW5kZXhPZihuZWVkbGUpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0IGRvZXMsIGFkZCBpdCB0byB0aGUgbGlzdCBvZiByZXR1cm5lZCB1c2Vyc1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybkxpc3QucHVzaCh0aGlzLnBhcmVudC51c2Vyc1trZXldKTtcblxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZXR1cm4gYWxsIGZvdW5kIHVzZXJzXG4gICAgICAgICAgcmV0dXJuIHJldHVybkxpc3Q7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhZGQgdGhpcyBwbHVnaW4gdG8gdGhlIENoYXQgY2xhc3Nlc1xuICAgIHJldHVybiB7XG4gICAgICBleHRlbmRzOiB7XG4gICAgICAgICAgQ2hhdDogZXh0ZW5zaW9uLFxuICAgICAgICAgIEdsb2JhbENoYXQ6IGV4dGVuc2lvblxuICAgICAgfVxuICAgIH1cblxuXG59XG4iXX0=
