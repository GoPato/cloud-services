module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    'import/prefer-default-export': 0,
  },
}
