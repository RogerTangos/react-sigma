import webpack from 'webpack';
import yargs from 'yargs';

export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export const jsLoader = 'babel?cacheDirectory';

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  module: {
    loaders: [
      { test: /\.js/, loader: jsLoader, exclude: [/node_modules/,/\/sigma.*\//] },
      { test: /\/sigma\/[^\/]*\.js/, loader: 'imports?this=>window' },  // locally built sigma lib
      { test: /\/sigma[^\/]*\/build.*\.js/, loader: 'imports?this=>window' }, // resources from sigma lib
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;