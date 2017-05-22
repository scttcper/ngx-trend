const sourcemaps = require('rollup-plugin-sourcemaps');

export default {
  entry: './deploy/index.js',
  dest: './deploy/trend.umd.js',
  format: 'umd',
  moduleName: 'ngxtrend',
  sourceMap: true,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
  },
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/platform-browser',
  ],
  plugins: [
    sourcemaps()
  ]
};
