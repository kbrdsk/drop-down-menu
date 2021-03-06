const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/dropdown.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
		],
	},
};