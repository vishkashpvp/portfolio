import eslintConfigPrettier from "eslint-config-prettier/flat";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextConfig = require("eslint-config-next/core-web-vitals");

const config = [...nextConfig, eslintConfigPrettier];

export default config;
