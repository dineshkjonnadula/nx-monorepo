export default {
  displayName: 'shared-environments',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/environments',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
