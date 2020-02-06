// rollup.config.js
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import analyse from 'rollup-plugin-analyzer';
import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import banner from 'rollup-plugin-banner';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';

export default {
  input: "src/index.js",
  plugins: [
    alias({
      entries: [{ find: 'src', replacement: './src' }]
    }),
    autoExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main'],
      browser: true,
      extensions: ['.js'],
    }),
    commonjs({
      namedExports: {
        // left-hand side can be an absolute path, a path
        // relative to the current directory, or the name
        // of a module in node_modules
        '@djforth/cookie_mgmt_fp': "CookieMgmt",
        lodash: ['isPlainObject', 'isArray', 'isElement', 'isFunction', 'uniqueId'],
        "lodash/isArray": "isArray",
        'lodash/isPlainObject': 'isPlainObject',
        "lodash/isElement": "isElement",
        "lodash/isFunction": "isFunction",
        "lodash/uniqueId": "uniqueId",
      }
    }),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    json(),
    replace({
      exclude: 'node_modules/**',
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV)
    }),
    strip({
      // defaults to `[ 'console.*', 'assert.*' ]`
      functions: ['console.*', 'assert.*', 'debug', 'alert']
    }),
    terser(),
    banner('Morse utils v<%= pkg.version %> by <%= pkg.author %>'),
    analyse()
  ],
  external: [
    "@djforth/cookie_mgmt_fp",
    "lodash/isArray",
    "lodash/isElement",
    "lodash/isFunction",
    "lodash/isPlainObject",
    "lodash/uniqueId",
  ],
  output: {
    file: "index.js",
    format: "umd",
    name: "MorseUtils",
    sourcemap: true,
    globals: {
      "lodash/isArray": "_isArray",
      'lodash/isPlainObject': '_isPlainObject',
      "lodash/isElement": "_isElement",
      "lodash/isFunction": "_isFunction",
      "lodash/uniqueId": "uniqueId",
      "@djforth/cookie_mgmt_fp": "CookieMgmt"
    }
  }
};
