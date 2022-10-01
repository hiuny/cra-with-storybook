import { initialize, mswDecorator } from 'msw-storybook-addon';

// Initialize MSW
initialize({
  serviceWorker: {
    // serviceWorker.url의 기본 값은 '/mockServiceWorker.js'이다.
    // 스토리북을 도메인의 루트가 아니라 하위 디렉토리에서 실행하는 경우는 이 파일을 찾지 못하는 이슈가 있다.
    // (상대 경로로 지정하면 찾기는 하는데 제대로 초기화가 되지 않는다.)
    // 그래서 스토리북이 실행되고 있는 경로를 찾아서 절대경로로 지정해야 한다.
    // https://www.A.com/sub/ 에서 실행된다고 가정할 때, mockServiceWorker.js의 올바른 경로는
    // https://www.A.com/sub/mockServiceWorker.js 이다.
    // 이 파일(preview.js)에서 location.pathname을 출력해보면 'https://www.A.com/sub/iframe.html'이라고 나오므로
    // 'iframe.html' 문자열을 ''으로 치환하는 로직을 사용한다.
    // 상위 윈도우의 location(windpw.parent.location)에 접근하여 pathname을 출력해보면 'https://www.A.com/sub/'가
    // 나오므로 그대로 사용하면 문제가 없긴 한데, github actions에서 test-storybook 스크립트를 수행할 때는
    // 뭐가 문젠지 모르겠으나 'https://www.A.com/sub/iframe.html'이 나와서 테스트가 실패하므로 그건 버린다..
    url: (({ origin, pathname }) => {
      let mswWorkerPath = `${origin}${pathname}`.replace('iframe.html', '')
      console.log('[msw] mockServiceWorker.js 경로: ', `${mswWorkerPath}mockServiceWorker.js`)
      return `${mswWorkerPath}mockServiceWorker.js`
    })(location),
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