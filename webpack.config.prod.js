const path = require('path');
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/CamerasPage.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-env']
        // }        
        options: {
          presets: [['@babel/preset-env',{useBuiltIns:'usage', corejs:{version:3}}]],"plugins":[["@babel/plugin-proposal-class-properties"
          ]]
        },
      }
    }
  ]
},
  devtool: 'cheap-source-map',
	 plugins:[
		 new CleanPlugin.CleanWebpackPlugin()
	 ]  // devServer: {
  //   contentBase: './'
  // }
};