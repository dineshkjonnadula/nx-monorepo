export default {
  displayName: 'shared-ui-components',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/ui-components',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
