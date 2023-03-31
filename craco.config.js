const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                use: 'nib'
              }
            }
          }]
        },
      ],
    }
  }
};
