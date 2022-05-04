import { TSESLint } from "@typescript-eslint/experimental-utils";

const restrictModuleImports: TSESLint.RuleModule<"restrictModuleImports", []> =
  {
    meta: {
      type: "suggestion",
      messages: {
        restrictModuleImports: "{{ message }}",
      },
      schema: [],
    },
    create: (context) => {
      return {
        ImportDeclaration(node) {
          // 呼び出し元のファイルパス
          const filePath = context.getFilename();
          const isCore = filePath.includes("@core");

          const importPath = node.source.value;
          if (typeof importPath !== "string") return;

          // import を禁止したいファイルパス
          const isForbiddenPath = importPath.includes("@hoge");

          //core における import rule
          if (isCore) {
            if (isForbiddenPath) {
              context.report({
                node,
                messageId: "restrictModuleImports",
                data: {
                  message: `core モジュールは @hoge モジュールをインポートできません。`,
                },
              });
            }
          }
        },
      };
    },
  };

module.exports = restrictModuleImports;
export default restrictModuleImports;
