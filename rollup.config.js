import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import eslint from "rollup-plugin-eslint";
import buble from "rollup-plugin-buble";
import pkg from "./package.json";

export default [
	// browser-friendly UMD build
	{
		entry: "src/main.js",
		dest: pkg.browser,
		format: "umd",
		moduleName: "howLongUntilLunch",
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			eslint({
				exclude: ["node_modules/**"]
			}),
			buble({
				// transpile ES2015+ to ES5
				exclude: ["node_modules/**"]
			})
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// the `targets` option which can specify `dest` and `format`)
	{
		entry: "src/main.js",
		external: ["ms"],
		targets: [
			{ dest: pkg.main, format: "cjs" },
			{ dest: pkg.module, format: "es" }
		],
		plugins: [
			eslint({
				exclude: ["node_modules/**"]
			}),
			buble({
				exclude: ["node_modules/**"]
			})
		]
	}
];
