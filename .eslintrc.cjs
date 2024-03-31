module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: 2,
    /** console.log 提醒 */
    'no-console': 'warn',
    /** 不限制組件名稱 */
    'vue/multi-word-component-names': 0,
    /** 不限制組件名稱 */
    '@typescript-eslint/no-explicit-any': ['off'],
    /** ts interface設定結尾符號 */
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    'vue/html-indent': ['error', 2, { alignAttributesVertically: false }],
    /** templete 排版設定，限至單行或必定分行 */
    'vue/first-attribute-linebreak': ['error', {
      singleline: 'ignore',
      multiline: 'below',
    }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
