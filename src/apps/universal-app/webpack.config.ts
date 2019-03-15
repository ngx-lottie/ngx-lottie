import { Configuration, ContextReplacementPlugin } from 'webpack';
import { join } from 'path';

export default {
  mode: 'none',
  context: __dirname,
  entry: './server.ts',
  output: {
    path: join(__dirname, 'dist-server'),
    filename: 'main.js'
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
    new ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      join(__dirname, 'src'),
      {}
    )
  ]
} as Configuration;
