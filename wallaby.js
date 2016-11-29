module.exports = function (wallaby) {
  return {
    files: [
      "src/**/*.js",
      "dist/localiser.js",
      "spec/test-strings-en_US.js",
      "spec/test-strings-da.js",
      "index.js"
    ],

    tests: [
      'spec/**/*Spec.js'
    ],

    compilers: {
    },

    testFramework: "jasmine",

    env: {
      type: 'node'
    }
  };
};