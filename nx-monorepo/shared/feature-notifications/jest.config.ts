export default {
  displayName: 'shared-feature-notifications',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/feature-notifications',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
