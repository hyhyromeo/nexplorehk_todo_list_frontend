module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // Transform TypeScript files
    "^.+\\.(js|jsx)$": "babel-jest", // Transform JavaScript files
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mocks CSS imports
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Include packages that use ESM in transformations
  ],
};
