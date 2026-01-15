import { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../views/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links'
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  },
  staticDirs: ['../public']
};

export default config;
