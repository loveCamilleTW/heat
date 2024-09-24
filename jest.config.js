module.exports = {
  // Existing configurations
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.html$': 'raw-loader',
  },
  moduleNameMapper: {
    '\\.html$': '<rootDir>/path_to_mock_html_files/$1.html',
  },
  testEnvironment: 'node',
};