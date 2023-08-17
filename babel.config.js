module.exports = {
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          'components/*': ['./src/components/*'],
          'configs/*': ['./src/configs/*'],
          'font/*': ['./src/font/*'],
          'hooks/*': ['./src/hooks/*'],
          'pages/*': ['./src/pages/*'],
          'stores/*': ['./src/stores/*'],
          'utils/*': ['./src/utils/*'],
          'styles/*': ['./src/styles/*'],
          'assets/*': ['./src/assets/*'],
          'data/*': ['./src/data/*'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
