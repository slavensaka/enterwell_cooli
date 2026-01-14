import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,

  // Global ignores
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'storybook-static/**',
      'playwright-report/**',
      '.stories-pending/**',
      '.stories-approved/**',
      'playwright/**',
      '**/*.d.ts',
      'helpers/**',
      'eslint.config.mjs',
      'next.config.js',
      'jest.config.js',
      '.storybook/**'
    ]
  },

  // TypeScript/React files configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        localStorage: 'readonly',
        window: 'readonly',
        document: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'import': importPlugin,
      '@next/next': nextPlugin
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      // Base rules
      'no-trailing-spaces': 'error',
      'max-len': ['error', { code: 150, comments: 100 }],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-double'],
      'comma-dangle': ['error', 'never'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      'no-redeclare': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',

      // React rules
      'react/jsx-max-props-per-line': ['error', { maximum: { single: 2, multi: 1 } }],
      'react/jsx-props-no-multi-spaces': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
      'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // JSX A11y
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['next/link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton']
        }
      ],

      // Import rules
      'import/no-unresolved': 'off',
      'import/no-absolute-path': 'error',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'unknown'],
          'newlines-between': 'always',
          alphabetize: { order: 'desc', caseInsensitive: true }
        }
      ],

      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error'
    }
  },

  // Test files configuration
  {
    files: ['**/*.spec.js', '**/*.spec.ts', '**/*.test.js', '**/*.test.ts'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly'
      }
    },
    rules: {
      'no-undef': 'off'
    }
  }
];
