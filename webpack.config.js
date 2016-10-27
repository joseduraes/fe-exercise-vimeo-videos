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
            { test: /\.css$/, loader: "style!css"},
            { test: /\.tsx?$/, loader: 'ts-loader'},
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        ]
    },
    devServer: {
        hot: true
    } 
};