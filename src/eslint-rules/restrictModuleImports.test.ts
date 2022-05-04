import restrictModuleImports from "./restrictModuleImports";
import { TSESLint } from "@typescript-eslint/experimental-utils";

const tester = new TSESLint.RuleTester({
  parser: require.resolve("espree"),
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
    },
  },
});

tester.run(`/core が @hoge をインポートしていないか`, restrictModuleImports, {
  valid: [
    {
      filename: "@core/foo.ts",
      code: `import { FooModel } from '@bar/test'`,
    },
  ],
  invalid: [
    {
      filename: "@core/foo.ts",
      code: `import { FooModel } from '@hoge/fuga'`,
      errors: [{ messageId: "restrictModuleImports" }],
    },
  ],
});
