import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
console.log('msw init 하기 전');
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`)
const { origin, pathname } = location
const mswWorkerPath = process.env.NODE_ENV === 'development' ? '' : `${origin}${pathname}`
initialize({
  serviceWorker: {
    url: `${mswWorkerPath}mockServiceWorker.js`,
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