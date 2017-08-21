const autoprefixer = require('autoprefixer');
const cssMQPacker = require("css-mqpacker");
const duplicates  = require('postcss-discard-duplicates');
const smartImport = require("postcss-smart-import");
const longhand = require("postcss-merge-longhand");
const mergeRules = require("postcss-merge-rules");

module.exports = {
  plugins: [
    autoprefixer
    , cssMQPacker
    , duplicates
    , longhand
    , mergeRules
    , smartImport
  ]
};