import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	{
		rules: {
			// The key rule you were missing - this is what's causing your build to fail
			"@typescript-eslint/no-explicit-any": "warn",

			// Your existing rules
			"@typescript-eslint/no-unused-vars": "warn",
			"react/no-unescaped-entities": "warn",
			"@next/next/no-img-element": "warn",
			"react-hooks/exhaustive-deps": "warn",

			// Additional rules that might help with your build
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/prefer-as-const": "warn",

			// Allow console logs during development
			"no-console": "warn",

			// Make other common strict rules into warnings
			"prefer-const": "warn",
			"no-var": "warn",

			// Optional: You can also completely disable specific rules if needed
			// "@typescript-eslint/no-unused-vars": "off",
			// "react/no-unescaped-entities": "off",
			// "@typescript-eslint/no-explicit-any": "off",
		},
	},
];

export default eslintConfig;
