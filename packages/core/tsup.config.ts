import { defineConfig } from "tsup";

export default defineConfig([
    {
        name: "@monster-codes/boilerplate-api-core-library",
        entry: [ "src/index.ts", "src/client/index.ts", "src/server/index.ts" ],
        format: [ "esm", "cjs" ],
        dts: true,
        splitting: false,
        sourcemap: true,
        clean: true,
        target: "node14",
        outDir: "dist",
        tsconfig: "tsconfig.json",
    }
]);
