var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: __dirname + "/client",
    entry: "./main.ts",
    output: {
        path: __dirname + '/dist',
        publicPath: '_assets/',
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            { test: /\.tsx?$/, loader: 'ts-loader'},
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.json$/, loader: "json-loader" },
            {
                extensions: ['ttf', 'eot', 'svg', 'cur'],
                test: /\.(ttf|eot|svg|cur)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=[name].[md5:hash:hex:20].[ext]'
            },
            {
                extensions: ['woff'],
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?name=[name].[md5:hash:hex:20].[ext]&limit=10000&minetype=application/font-woff'
            },
        ]
    },
    devServer: {
        hot: true
    }, 
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};