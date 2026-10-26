import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Flat ESLint config.
 *
 * Scope: catch real bugs in app code — hook dependency mistakes, accessibility
 * regressions (jsx-a11y), and unused/incorrect TypeScript. Formatting is left to
 * the editor; there is no Prettier integration on purpose.
 *
 * `npm run lint` runs this; `npm run typecheck` runs `tsc --noEmit`.
 */
export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'test-results',
      'playwright-report',
      'audit-output*',
      'backups',
      'public',
      // Standalone design reference / old prototypes: not part of the app build
      // (tsconfig only includes `src`, Vite never bundles them).
      'website-ui-design',
      'prototypes',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // Content/data modules export constants next to components; fast-refresh
      // granularity is not something this static site depends on.
      'react-refresh/only-export-components': 'off',

      // TypeScript already resolves identifiers; `no-undef` only produces
      // false positives on type-only names.
      'no-undef': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: 2022, globals: { ...globals.node } },
  },
  {
    // Node-side test/audit/config files.
    files: ['tests/**/*.ts', 'scripts/**/*.ts', '*.config.ts'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      // Playwright fixtures are typed loosely on purpose, and its `use` callback
      // is not a React hook.
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/rules-of-hooks': 'off',
    },
  },
);
