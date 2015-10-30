var webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    config = require('./webpack.config');

new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(8080, 'localhost', function(error, result) {
    if(error) {
        console.log(error);
    }
    console.log('Listening at localhost:8080');
});
