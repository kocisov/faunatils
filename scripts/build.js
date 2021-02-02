const pkg = require("../package.json");

require("esbuild").build({
  entryPoints: ["src/index.ts"],
  platform: "node",
  minify: true,
  bundle: true,
  outfile: pkg.main,
  format: "cjs",
  external: ["faunadb"],
});

require("esbuild").build({
  entryPoints: ["src/index.ts"],
  platform: "node",
  minify: true,
  bundle: true,
  outfile: pkg.module,
  format: "esm",
  external: ["faunadb"],
});
