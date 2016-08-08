module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        options: {
          transform: [['babelify', { presets: ['react'] }]]
        },
        src: ['src/index.js'],
        dest: 'build/app.js'
      }
    },
    watch: {
      scripts: {
        files: ["src/**"],
        tasks: ["browserify"]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Default task(s).
  grunt.registerTask('default', ['watch']);

};