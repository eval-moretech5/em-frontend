import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
//create css file per js file: https://webpack.kr/plugins/mini-css-extract-plugin/
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isDevelopment = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';

// define plugins
const plugins: webpack.WebpackPluginInstance[] = [
    new HTMLWebpackPlugin({
        template: './public/index.html', // you have to have the template file
    }),
    new webpack.DefinePlugin({
        // SERVICE_URL: JSON.stringify("http://localhost"),
        "process.env": {
            "service": isDevelopment ? JSON.stringify("https://localhost") : JSON.stringify("")
        }
    }),
];
isDevelopment
    ? plugins.push(new ReactRefreshWebpackPlugin())
    : plugins.push(new MiniCssExtractPlugin());

const config: webpack.Configuration = {
    mode: isDevelopment ? 'development' : 'production',
    externals: {
        externalsType: 'script',
        // ymaps3: "ymaps3",
        // ymaps: "ymaps",
        '@yandex/ymaps3-types': [
            `promise new Promise((resolve) => {
                if (typeof ymaps3 !== 'undefined') {
                    return ymaps3.ready.then(() => resolve(ymaps3));
                }
      
                const script = document.createElement('script');
                script.src = "https://api-maps.yandex.ru/v3/?apikey=93cd8fd8-ed88-44e2-9646-2e73367bcf3f&lang=ru_RU";
                script.onload = () => {
                    ymaps3.ready.then(() => resolve(ymaps3));
                };
                document.body.appendChild(script);
            })`
        ]
    },
// @ts-ignore
    devServer: {
        hot: true,
        port: 3000,
    },
    entry: './src/index.tsx', // codes will be inside src folder
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].[contenthash].js",
        publicPath: "/",
        // more configurations: https://webpack.js.org/configuration/
    },
    plugins,
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
        // automatically resolve certain extensions (Ex. import './file' will automatically look for file.js)
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'],
        alias: {
            // absolute path importing files
            '@pages': path.resolve(__dirname, './src/pages'),
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: require.resolve('babel-loader'),
                        options: {
                            plugins: [
                                isDevelopment && require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/i, // .sass or .scss
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // for Tailwind CSS
                    'postcss-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ],
    },
    devtool: isDevelopment ? "inline-source-map" : undefined,
};

export default config;