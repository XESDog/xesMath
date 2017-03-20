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
        new HtmlWebpackPlugin({
            filename: './sample/index.html',
            template: './src/sample/index-template.html'
        }),
        // new ExtractTextWebpackPlugin('style.css'),
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
                // use: ExtractTextWebpackPlugin.extract({
                //     use: 'css-loader'
                // })
            },
        ],
    },

}