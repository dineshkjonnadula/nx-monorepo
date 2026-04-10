export default {
  displayName: 'shared-data-access-api',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/data-access-api',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
