// webpack.config.js
const path = require('path')

module.exports = {
  entry: './src/Index.tsx',
  output: {
    path: path.resolve(__dirname, './checkout-ui-custom'),
    filename: 'checkout6-custom.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './checkout-ui-custom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // add |ts
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // límite de tamaño para incrustar el archivo SVG (en bytes)
              fallback: 'file-loader',
              publicPath: '', // ruta relativa al archivo de salida
              name: '[name].[hash].[ext]', // nombre del archivo de salida
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'], // add .tsx, .ts
  },
  mode: 'development',
}
