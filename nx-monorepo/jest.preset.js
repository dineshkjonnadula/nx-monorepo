const { workspaceRoot } = require('@nx/devkit');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: `${workspaceRoot}/tsconfig.base.json`,
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  resolver: '@nx/jest/plugins/resolver',
  moduleFileExtensions: ['mjs', 'js', 'json', 'ts', 'tsx', 'node'],
  coverageReporters: ['html'],
  passWithNoTests: true
};
