'use strict';
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n' +
      ' * slinto.autocomplete() v<%= pkg.version %>\n' +
      ' * https://github.com/slinto/slinto.autocomplete\n' +
      ' * Copyright 2014 Slinto; Licensed MIT\n' +
      ' */\n',

    // paths
    path: {
      css: 'www/assets/css/',
      js: 'www/assets/js/'
    },

    less: {
      dev: {
        files: {
          '<%= path.css %>style.css': '<%= path.css %>main.less'
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          '<%= path.css %>style.css': '<%= path.css %>main.less'
        }
      }
    },

    /**
     * JS Hint
     */
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '<%= path.js %>.jshintrc'
        },
        src: ['<%= path.js %>**/*.js']
      },
    },

    /**
     * Production builded && closure compiler
     */
    closureBuilder: {
      options: {
        closureLibraryPath: 'www/assets/bower_components/closure-library',
        namespaces: '<%= pkg.namespace %>',
        compilerFile: 'www/assets/bower_components/closure-compiler/compiler.jar',
        compile: true,
        compilerOpts: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          define: ["'goog.DEBUG=false'"],
          //debug: "true",
          summary_detail_level: 3,
          //formatting: "PRETTY_PRINT",
          output_wrapper: '<%= banner %>(function(){%output%}).call(this);'
        },

        execOpts: {
          maxBuffer: 999999 * 1024
        },
      },
      targetName: {
        src: ['www/assets/bower_components/closure-library', '<%= path.js %>'],
        dest: 'www/assets/slinto.autocomplete-latest.js'
      }
    },

    /**
     * Generating a dependency file with depswriter.py
     */
    closureDepsWriter: {
      options: {
        closureLibraryPath: 'www/assets/bower_components/closure-library',
        root_with_prefix: '"www/assets/js/ ../../../../../assets/js"',
      },
      targetName: {
        dest: 'www/assets/app-deps.js',
      }
    },

    /**
     * Watch
     */
    watch: {
      options: {
        livereload: true,
      },
      less: {
        files: ['<%= path.css %>**/*.less'],
        tasks: ['less:dev'],
      },
      js: {
        files: ['<%= path.js %>**/*.js', 'Gruntfile.js'],
        tasks: ['gjslint','closureDepsWriter'],
      }
    },

    /**
     * Connect
     */
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'www',
          open: true
        }
      }
    },

    gjslint: {
      options: {
        flags: [
          '--disable 110'
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: ['<%= path.js %>**/*.js']
      }
    },

    clean: {
      build: ['build/']
    },

    copy: {
      main: {
        src: 'www/assets/slinto.autocomplete-latest.js',
        dest: 'build/slinto.autocomplete-latest.js'
      },
    },


  });

  require('load-grunt-tasks')(grunt);

  // Grunt tasks
  grunt.registerTask('default', ['less:dev', 'closureDepsWriter']);
  grunt.registerTask('build', ['clean', 'less:production', 'closureBuilder', 'copy']);
  grunt.registerTask('server', ['connect', 'watch']);

};
