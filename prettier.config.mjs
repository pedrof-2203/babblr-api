/** @type {import('prettier').Config} */
const config = {
  // General formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  // Avoid unexpected wrapping
  proseWrap: 'preserve',
  singleAttributePerLine: false,

  // File-specific settings
  overrides: [
    {
      files: ['*.json', '*.jsonc'],
      options: {
        parser: 'json',
        tabWidth: 2
      }
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
        singleQuote: false
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always'
      }
    }
  ]
};

export default config;
