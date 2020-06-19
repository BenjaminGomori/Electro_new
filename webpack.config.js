const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		// CamerasPage:'./src/CamerasPage.js',
		App: './src/components/app.js',
		CartPage: './src/CartPage.js',
		LaptopPage: './src/LaptopPage.js',
		PhonesPage: './src/PhonesPage.js',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'assets', 'scripts'),
		publicPath: 'assets/scripts/',
	},
	devtool: 'cheap-module-eval-source-map',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{ useBuiltIns: 'usage', corejs: { version: 3 } },
							],
						],
						plugins: [['@babel/plugin-proposal-class-properties']],
					},
				},
			},
		],
	},
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
	// devServer: {
	//   contentBase: './'
	// }
};

// const path = require('path');
// // require('./sass/main.scss');
// // const CleanPlugin = require('clean-webpack-plugin')

// module.exports = {
// 	mode: 'development',

// 	//https://www.youtube.com/watch?v=dt_9ttDw6lA
// 	entry: {
// 		CamerasPage: path.join(__dirname, 'src', 'CamerasPage.js'),
// 		CartPage: path.join(__dirname, 'src', 'CartPage.js'),
// 		LaptopPage: path.join(__dirname, 'src', 'LaptopPage.js'),
// 		PhonesPage: path.join(__dirname, 'src', 'PhonesPage.js'),
// 	},
// 	output: {
// 		filename: '[name].js',
// 		// path: path.join(__dirname + '/assets/scripts'),
// 		path: path.resolve(__dirname, 'assets', 'scripts'),
// 		publicPath: 'assets/scripts/',
// 	},
// 	devtool:'cheap-module-eval-source-map',

// 	devServer: {
// 		contentBase: './',
// 	},
// module: {
//   rules: [
//     {
//       test: /\.m?js$/,
//       exclude: /(node_modules|bower_components)/,
//       use: {
//         loader: 'babel-loader',
//         options: {
//           presets: [['@babel/preset-env', useBuiltIns:'usagen', corejs:{version: 3}]]
//         }
//       }
//     }
//   ]
// },
// };
