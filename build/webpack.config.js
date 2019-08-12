const fs = require('fs')
const path = require('path')
const StringReplacePlugin = require("string-replace-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, '../src/index'),
  target: 'web',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env",
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },
      { 
        test: /\index.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /__INJECT_THREE__/ig,
              replacement: () => {
                return fs.readFileSync(path.resolve(__dirname, '../vendor/three.js'), 'utf8')
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
      // an instance of the plugin must be present
      new StringReplacePlugin()
  ],
  optimization:{
    minimize: false,
  }
}