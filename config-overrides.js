const path = require('path');

module.exports = (config, env) => {
  console.log('Override Config:', config);

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@interfaces': path.resolve(__dirname, 'src/interfaces/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@contexts': path.resolve(__dirname, 'src/contexts/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@materials': path.resolve(__dirname, 'src/materials/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
    extensions: ['.js', '.ts', '.d.ts', '.tsx']
  };

  return config;
};