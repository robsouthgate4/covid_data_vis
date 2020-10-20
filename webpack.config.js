const path 				= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack 			= require('webpack');

module.exports = env => {

	return {
		entry: `./src/index.js`,
		output: {
			path: path.resolve( __dirname, 'dist' ),
			filename: 'index.js'
		},
		resolve: {
			extensions: [".js", ".wasm"],
			alias: {
				Assets: 	path.resolve( __dirname, "assets/" ),
				Common: 	path.resolve( __dirname, "./src/common/" ),
				Globals: 	path.resolve( __dirname, "./src/globals/" )
			}
		},
		plugins: [

			new HtmlWebpackPlugin( {

				template: `./src/index.html`,
				filename: 'index.html'

			} ),
			new webpack.DefinePlugin({

				

			} )

		],
		devServer: {

			contentBase: './dist',
			https: 	false,
			host: '0.0.0.0'

		},
		module: {
			
			rules: [
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.(png|jpe?g|gif|dds|hdr|obj|fbx|glb|gltf|fnt|csv)$/i,
					loader: 'file-loader'
				},
				{
					test: /\.(glsl|vs|fs|vert|frag)$/,
					exclude: /node_modules/,
					use: [
						'raw-loader',
						'glslify-loader'
					]
				},
				{
					test: /zcv\.wasm$/,
					type: "javascript/auto",
					loader: "file-loader"
				}
			]

		}
	}
};	