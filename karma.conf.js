// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    browsers: ["Chrome"],
    //noResolve: false,

    files: [
        "date-slider.js",
        "test/tests.js"
    ]
  })
}