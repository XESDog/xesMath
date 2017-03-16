/**
 * Created by work on 2017/3/15.
 */
const webpack = require('webpack');
const path = require('path');

const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        coniferCone: './src/coniferCone/coniferCone.js',
        main: './src/sample/index.js'
    },
    output: {
        filename: "js/[name].[chunkhash].js",
        path: path.resolve(__dirname, 'dist'),
        library: 'coniferCone',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['coniferCone', 'manifest']
        }),
        new htmlWebpackPlugin({
            filename: './sample/index.html',
            template: './src/sample/index-template.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: './src',
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', {modules: false}]],
                        plugins: ['syntax-dynamic-import']
                    }
                }]

            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },

}