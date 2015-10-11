var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
    entry: __dirname + '/js/app.js',
    output: {
        path: 'dist/js',
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
/*        preLoaders: [
            {
                test: /\.js$/,
                loader: 'jshint-loader',
                exclude: /(node_modules|bower_components)/
            }
        ],*/
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=4000'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new BowerWebpackPlugin({
            excludes: /.*\.less/
        })
    ]
}
