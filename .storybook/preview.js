import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize({
  serviceWorker: {
    url: 'https://hiuny.github.io/cra-with-storybook/mockServiceWorker.js'
  }
});

// Provide the MSW addon decorator globally
export const decorators = [mswDecorator];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}