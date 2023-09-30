module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'jest': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    },
    {
      'files': [ '**/src/**/*.test.{ts,tsx}' ]
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  'rules': {
    'indent': [ 2, 2, { 'SwitchCase': 1 } ],
    'quotes': [ 2, 'single' ],
    'semi': [ 2, 'always' ],
    'react/jsx-indent': [ 'off', 2 ],
    'react/no-deprecated': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent-props': [ 2, 2 ],
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-declaration': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { 'argsIgnorePattern': '^_' }
    ],
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'max-len': [ 'error', { 'code': 120, 'ignoreComments': true } ],
    'object-curly-spacing': [ 2, 'always' ],
    'array-bracket-spacing': [ 2, 'always' ],
    'react/self-closing-comp': [ 2, { 'component': true , 'html': true } ],
    'react/display-name': 'warn',
    'linebreak-style': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'no-undef': 'off'
  },
  'globals': {
    '__IS__DEV__': true
  },
};
