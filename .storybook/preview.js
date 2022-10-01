import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize({
  serviceWorker: {
    // serviceWorker.url의 기본 값은 '/mockServiceWorker.js'이다.
    // 스토리북을 도메인의 루트가 아니라 하위 디렉토리에서 실행하는 경우는 이 파일을 찾지 못하는 이슈가 있다.
    // (상대 경로로 지정하면 찾기는 하는데 제대로 초기화가 되지 않는다.)
    // 그래서 스토리북이 실행되고 있는 경로를 찾아서 절대경로로 지정해야 한다.
    // 스토리는 iframe에서 실행되는데 그래서 상위 window의 location에서 pathname을 참조해야 한다.
    // https://www.A.com/sub/ 에서 실행된다고 가정할 때. 이 preview.js가 실행되는 html은 https://www.A.com/sub/iframe.html 이므로
    // 상위 window (window.parent)의 location을 참조해야 스토리북 빌드시의 public 폴더의 파일들에 접근할 수 있다.
    url: (({ origin, pathname }) => {
      const mswWorkerPath = `${origin}${pathname}`
      console.log('[msw] mockServiceWorker.js 경로: ', `${mswWorkerPath}mockServiceWorker.js`)
      return `${mswWorkerPath}mockServiceWorker.js`
    })(window.parent.location),
  },
})

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