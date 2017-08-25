const sourcemaps = require('rollup-plugin-sourcemaps');
const resolve = require('rollup-plugin-node-resolve');

export default {
  name: 'ngxtrend',
  sourcemap: true,
  input: './deploy/trend.js',
  output: {
    file: './deploy/trend.umd.js',
    format: 'umd',
  },
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
    resolve({ module: true }),
    sourcemaps(),
  ],
  onwarn: (warning) => {
    const skip_codes = [
      'THIS_IS_UNDEFINED',
      'MISSING_GLOBAL_NAME',
    ];
    if (skip_codes.indexOf(warning.code) !== -1) return;
    console.error(warning);
  }
};
