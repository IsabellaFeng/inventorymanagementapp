const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        hot: true,
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // Injects CSS into the DOM via a <style> tag
                    'css-loader',   // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    'postcss-loader' // Processes CSS with PostCSS
                ]
            },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.tsx', '.wasm', '.ts']
    },
};