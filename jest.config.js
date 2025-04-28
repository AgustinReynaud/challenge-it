export default {
  testEnvironment: "node",
  transform: {},
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  watch: false,
  transformIgnorePatterns: ["/node_modules/(?!your-esm-package/)"],
};
