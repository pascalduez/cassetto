
"use strict";

module.exports = function(grunt) {

  // Load all grunt tasks matching the `grunt-*` pattern.
  require("load-grunt-tasks")(grunt);

  // Time how long tasks take.
  require("time-grunt")(grunt);

  var config = {
    base: "test",
    scss: "test/sass",
    css: "test/css",
    img: "test/img",
    src: "stylesheets",
    dist: "dist"
  }

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    conf: config,

    sass: {
      test: {
        options: {
          //trace: true,
          bundleExec: true,
          style: "expanded",
          loadPath: ["./<%= conf.src %>"]
        },
        files: [{
          expand: true,
          cwd: "<%= conf.scss %>",
          src: ["*.scss"],
          dest: "<%= conf.css %>/",
          ext: ".css"
        }]
      }
    },

    watch: {
      test: {
        files: ["<%= conf.scss %>/*.scss"],
        tasks: ["sass"]
      }
    },

    browserSync: {
      test: {
        bsFiles: {
          src: "<%= conf.css %>/*.css"
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "<%= conf.base %>"
          }
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ["last 2 version", "> 1%", "ie 8"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "<%= conf.css %>",
          src: "{,*/}*.css",
          dest: "<%= conf.css %>"
        }]
      }
    },

    concat: {
      options: {
        banner: "/*! <%= pkg.name %> – v<%= pkg.version %> – <%= grunt.template.today('yyyy-mm-dd') %> */\n",
      },
      dist: {
        src: [
          "<%= conf.src %>/cassetto/_accelerate.scss",
          "<%= conf.src %>/cassetto/_arrowtail.scss",
          "<%= conf.src %>/cassetto/_bevel.scss",
          "<%= conf.src %>/cassetto/_calc.scss",
          "<%= conf.src %>/cassetto/_centered-items.scss",
          "<%= conf.src %>/cassetto/_functions.scss",
          "<%= conf.src %>/cassetto/_generated.scss",
          "<%= conf.src %>/cassetto/_leading.scss",
          "<%= conf.src %>/cassetto/_log.scss",
          "<%= conf.src %>/cassetto/_quote.scss",
          "<%= conf.src %>/cassetto/_truncate.scss",
          "<%= conf.src %>/cassetto/_typography.scss",
          "<%= conf.src %>/cassetto/_whitespace.scss"
        ],
        dest: "<%= conf.dist %>/_<%= pkg.name %>.scss",
      },
    }

  });


  grunt.registerTask("test", [
    "browserSync:test",
    "watch:test"
  ]);

  grunt.registerTask("dist", [
    "concat:dist"
  ]);

  grunt.registerTask("prefix", [
    "autoprefixer"
  ]);

};
