const path = require("path");
const distPath = `${__dirname}${path.sep}static`;

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/app.jsx'],
        vendor: ['react', 'react-dom', 'react-router-dom'],
    },
    output: {
        path: distPath,
        filename: "[name].bundle.js",
        // chunkFilename: "vendor.bundle.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    plugins: [],
    devtool: 'source-map',  //seems to be default with webpack 4.
    module: {
        rules:  [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
        ]
    },
    devServer: {
        port: 8000,
        contentBase: 'static',
        historyApiFallback: true,
        proxy: {
            "/api/*": {
                target: 'http://localhost:3000'
            }
        }
    }
};