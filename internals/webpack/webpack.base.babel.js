import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';

import pkg from '../../package.json';

const isDev = process.env.NODE_ENV !== 'production';

export const reScript = /\.(js)$/;
export const reStyle = /\.(css|scss)$/;
export const reImage = /\.(jpg|jpeg)$/;

module.exports = options => ({
	entry: options.entry,
	name: options.name,

	output: Object.assign({
		publicPath: '/assets/',
		filename: isDev
			? '[name].js'
			: '[name].[chunkhash:8].js',
		chunkFilename: isDev
			? '[name].chunk.js'
			: '[name].[chunkhash:8].chunk.js',
		// Point sourcemap entries to original disk location (format as URL on Windows)
		devtoolModuleFilenameTemplate: info =>
			path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
		sourceMapFilename: '[file].map'
	}, options.output),

	module: {
		// Make missing exports an error instead of warning
		strictExportPresence: true,

		rules: [
			{
				test: reScript,
				loader: 'babel-loader',
				include: [
					path.join(process.cwd(), 'src')
				],
				exclude: path.resolve('./node_modules'),
				options: {
					// https://github.com/babel/babel-loader#options
					cacheDirectory: isDev,

					// https://babeljs.io/docs/usage/options/
					babelrc: false,
					presets: [
						['@babel/preset-env',	{
							targets: options.name === 'client'
								? {
									browsers: pkg.browserslist,
									forceAllTransforms: !isDev // for UglifyJS
								}
								: {
									node: pkg.engines.node.match(/(\d+\.?)+/)[0]
								},
							modules: false,
							useBuiltIns: false,
							debug: false
						}
						],
						'@babel/preset-stage-2',
						'@babel/preset-react'
					],
					plugins: [
						'transform-strip-svg-sprite',
						...(isDev
							? []
							: [
								'@babel/transform-react-constant-elements',
								'@babel/transform-react-inline-elements',
								'transform-react-remove-prop-types'
							]
						)
					]
				}
			},
			{
				test: reStyle,
				use: options.name === 'client' ? ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: 'postcss.config.js'
								}
							}
						}
					]
				})) : {
					loader: 'null-loader'
				}
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							prefixize: true,
							...(options.name !== 'client'
								? {}
								: {
									extract: true,
									spriteFilename: svgPath => `images/sprite${svgPath.substr(-4)}`
								}
							)
						}
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{removeTitle: true},
								{convertColors: {shorthex: false}},
								{convertPathData: false}
							]
						}
					}
				]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					context: 'src/',
					name: '[path][name].[ext]',
					emitFile: options.name === 'client'
				}
			},
			{
				test: reImage,
				include: [
					path.join(process.cwd(), 'src/image')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							context: 'src/',
							name: '[path][name].[ext]',
							emitFile: options.name === 'client'
						}
					},
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true,
								quality: 80,
							},
							optipng: {
								enabled: false,
							},
						},
					},
				],
			},

			// Exclude dev modules from production build
			...(isDev
				? []
				: [
					{
						test: path.resolve(
							__dirname,
							'../node_modules/react-deep-force-update/lib/index.js'
						),
						loader: 'null-loader'
					}
				])
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
				ANALYZE: JSON.stringify(process.env.ANALYZE)
			}
		}),

		...(options.name !== 'client'
			? []
			: [
				new ExtractTextPlugin('app.min.css'),
				new SpriteLoaderPlugin({ plainSprite: true })
			]
		),

		...(options.plugins ? options.plugins : [])
	],

	resolve: {
		modules: ['src', 'node_modules']
	},

	devtool: isDev && 'source-map',

	target: options.target, // Make web variables accessible to webpack, e.g. window

	stats: options.stats || {},

	externals: options.externals || [],

	performance: options.performance || {}
});
