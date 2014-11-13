'use strict';


module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      client: {
        src: 'public/scripts/dashboard.js',
        dest: 'public/build/bundle.js'
      }
    },
    watch: {
      js: {
        files: ['public/scripts/**/*.js'],
        tasks: ['browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 'browserify');

};
