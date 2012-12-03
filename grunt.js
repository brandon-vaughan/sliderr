/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-compass');

  // Project configuration.
  grunt.initConfig({

    watch: {
      files: [ 'sass/**/*.scss' ],
      tasks: [ 'compass:dev', 'compass:prod' ]
    },

    compass: {
      dev: {
        src: 'sass',
        dest: 'dev/css',
        linecomments: true,
        forcecompile: true,
        debugsass: true,
        images: 'images',
        relativeassets: true
      },
      prod: {
        src: 'sass',
        dest: 'stylesheets',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false,
        images: 'images',
        relativeassets: true
      }
    },

    meta: {
      version: '0.1.0',
      banner: '/** ! Sliderr - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %>\n' +
        ' *\n' +
        ' * Oh, hey. Nice of you to take a look :)\n' +
        ' *\n' +
        ' * You\'re looking at the concatenated and minified version\n' +
        ' * of all the js files used on the site.\n' +
        ' * But in the spirit of open-source, you can still scour\n' +
        ' * our original un-minified and fully commented scripts\n' +
        ' * all within js/\n' +
        ' */'
    },
    lint: {
      files: ['grunt.js', 'js/components/*.js', 'js/main.js']
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'js/vendor/modernizr.min.js',
          'js/vendor/jquery.min.js',
          'js/components/slider.js',
          'js/main.js'
        ],
        dest: 'js/scripts.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'js/scripts.min.js'
      }
    }


  });

  // Default task.
  grunt.registerTask('default', 'compass:dev');

};
