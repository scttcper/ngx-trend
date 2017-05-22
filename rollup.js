const sourcemaps = require('rollup-plugin-sourcemaps');
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: './deploy/index.js',
  dest: './deploy/trend.umd.js',
  format: 'umd',
  moduleName: 'ngxtrend',
  sourceMap: true,
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser'
  },
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/platform-browser'
  ],
  plugins: [
    resolve({ module: true }),
    sourcemaps()
  ]
};
