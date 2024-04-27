const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'), //its for the main js file where are imported all modules
    },
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',  //the name al the js file after all modules compiled together
        clean: true, //clean before generate a new js file
        assetModuleFilename: 'images/[name][ext]' //its for image names at dist
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: "TODO",
            filename: 'index.html', //the name of the html from source to destination
            template: 'src/index.html' //that is the html file in source
        })
    ],
    module:{
        rules:[
            {
                test: /\.scss$/,
                use: [  //compile the sass files with the sass loader
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)/, //to allow using images
                type: 'asset/resource'
            },
        ]
    },
    devtool: 'inline-source-map',
    devServer:{ //to see the chnages in real time
        static: {
            directory: path.resolve(__dirname,'dist')
        },
        port: 4000,
        //open: true,
        hot: false,
        liveReload: true,
        compress: true,
        historyApiFallback: true,
    },
};