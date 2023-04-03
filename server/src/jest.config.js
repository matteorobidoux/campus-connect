/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
<<<<<<< HEAD
  coveragePathIgnorePatterns: ["./db/db.ts", "./oauth"],
=======
  coveragePathIgnorePatterns:["./db/db.ts",  "./oauth"],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
>>>>>>> 29152ecff5f0f2fba3daf2b4842725b297a3c139
};
