const config = {
  roots: ["<rootDir>"],
  testMatch: ["./**/*.test.(ts|tsx)"],
  testPathIgnorePatterns: ["node_modules", "dist"],
  transformIgnorePatterns: ["node_modules", "dist"],
  transform: {
    ".+\\.(t)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
        module: {
          type: "commonjs",
        },
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts", "**/*.tsx"],
};

module.exports = config;
