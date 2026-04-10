export default {
  displayName: 'shared-models',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/models',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
