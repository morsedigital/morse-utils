// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js'],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    }),
    replace({
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
    }),
    uglify(),
  ],
  external: ['lodash/includes', 'lodash/isArray', 'lodash/isElement', 'lodash/isFunction', '@djforth/cookie_mgmt_fp'],
  output: {
    file: 'index.js',
    format: 'umd',
    name: 'MorseUtils',
    sourcemap: true,
    globals: {
      'lodash/includes': '_includes',
      'lodash/isArray': '_isArray',
      'lodash/isElement': '_isElement',
      'lodash/isFunction': '_isFunction',
      '@djforth/cookie_mgmt_fp': 'CookieMgmt',
    },
  },
};
