export default {
  displayName: 'project-one',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/projects/project-one',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  }
};
