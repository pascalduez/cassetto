
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['last 2 version', '> 1%', 'ie 8']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '/test',
          src: '{,*/}*.css',
          dest: '/test'
        }]
      }
    }
  });

  grunt.registerTask('prefix', [
    'autoprefixer'
  ]);

};
