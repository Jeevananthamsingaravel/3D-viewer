const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        ContactUs:'./src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "crypto-browserify": require.resolve('crypto-browserify'), 
        } 
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/public',
        library: {
            type: "module"
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/static', to: 'static' }
            ]
        })
    ],
    optimization: {
        minimize: false,
        minimizer: [
          new TerserPlugin({
            exclude: /static/,
          }),
        ],
    },
    experiments: {
        outputModule: true
    }
};