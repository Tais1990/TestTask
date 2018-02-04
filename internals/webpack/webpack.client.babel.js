import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const isDev = process.env.NODE_ENV !== 'production';
const isAnalyze = process.env.ANALYZE === 'true';

module.exports = require('./webpack.base.babel')({
	name: 'client',

	entry: {
		client: ['@babel/polyfill', './src/client.js']
	},

	output: {
		path: path.resolve(process.cwd(), 'dist/client')
	},

	plugins: [
		// Emit a file with assets paths
		// https://github.com/sporto/assets-webpack-plugin#options
		new AssetsPlugin({
			path: path.resolve(process.cwd(), 'dist/server'),
			filename: 'assets.json',
			prettyPrint: true
		}),

		// Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
		// https://webpack.js.org/plugins/commons-chunk-plugin/
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module => /node_modules/.test(module.resource)
		}),

		...(isDev
			? []
			: [
				// Decrease script evaluation time
				// https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
				new webpack.optimize.ModuleConcatenationPlugin(),

				// Minimize all JavaScript output of chunks
				// https://github.com/mishoo/UglifyJS2#compressor-options
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						unused: true,
						dead_code: true,
						screw_ie8: true
					},
					mangle: {
						screw_ie8: true
					},
					output: {
						comments: false,
						screw_ie8: true
					},
					sourceMap: true
				})
			]),

		// Webpack Bundle Analyzer
		// https://github.com/th0r/webpack-bundle-analyzer
		...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
	],

	target: 'web',

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	// https://webpack.js.org/configuration/node/
	// https://github.com/webpack/node-libs-browser/tree/master/mock
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},

	performance: {
		hints: false
	},

	stats: {
		colors: true,
		timings: true,
		reasons: true
	}
});
