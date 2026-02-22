import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/db/schema.graphql",
  generates: {
    "./src/models.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true, // Recommended for resolver types
      },
    },
  },
};

export default config;