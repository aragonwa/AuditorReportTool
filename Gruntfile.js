module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      dev : {
        NODE_ENV : 'production',
      }
    },
    browserify: {
      dist: {
        options: {
          transform: [['babelify', { presets: ['react'] }]]
        },
        src: ['src/index.js'],
        dest: 'build/app.js'
      }
    },
    uglify: {
      build: {
        src:'build/app.js',
        dest: 'build/app.js'
      }
    },
    watch: {
      scripts: {
        files: ["src/**"],
        tasks: ["env", "browserify", "uglify"]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-env');

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};