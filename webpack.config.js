/**
 * Created by work on 2017/3/15.
 */
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        coniferCone: './src/coniferCone/coniferCone.js',
        main: './index.js'
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
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index-template.html'
        }),
        new ExtractTextWebpackPlugin('style.css'),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

};