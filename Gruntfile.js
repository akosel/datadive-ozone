'use strict';


module.exports = function(grunt) {
  grunt.registerTask('hello', function() {
    console.log('hello');
  });

  grunt.registerTask('default', 'hello');
};
