import { join } from 'path';
import { Configuration, ContextReplacementPlugin } from 'webpack';

export default {
  mode: 'none',
  context: __dirname,
  entry: {
    server: './server.ts'
  },
  output: {
    path: join(__dirname, 'dist-server'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, join(__dirname, 'src'), {}),
    new ContextReplacementPlugin(/(.+)?express(\\|\/)(.+)?/, join(__dirname, 'src'), {})
  ]
} as Configuration;
