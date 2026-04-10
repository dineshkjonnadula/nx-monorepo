export default {
  displayName: 'project-two',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/projects/project-two',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json', stringifyContentPathRegex: '\\.(html|svg)$' }
    ]
  }
};
