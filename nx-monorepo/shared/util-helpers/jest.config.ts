export default {
  displayName: 'shared-util-helpers',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/shared/util-helpers',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
