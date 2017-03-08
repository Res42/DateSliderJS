// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
    browsers: ["Chrome"/*, "Firefox", "Opera", "Edge", "IE", "IE10", "IE9", "IE8"*/],

    customLaunchers: {
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      },
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE8: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE8'
      }
    },

    files: [
        "date-slider.js",
        "test/tests.js"
    ]
  })
}