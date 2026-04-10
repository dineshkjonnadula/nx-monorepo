export default {
  displayName: 'shared-feature-auth',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/feature-auth',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
