---
key: 'webpack-v4-development-configuration'
title: '[webpack v4] Development 환경 구성하기'
description: ''
createdAt: '06-27-2018 23:51'
thumbnail: '/images/webpack2.png'
categories: ['development', 'webpack']
tags: ['build', 'bundle', 'bundler', 'guide', 'webpack', 'javascript']
---
# [webpack v4] Development 환경 구성하기

[지난 Output Management 편](/posts/webpack-v4-output-management)에서는 다수의 js 파일을 entry point를 사용해 하나의 bundle 파일로 만들어보았다. 이번 포스팅에서는 프로젝트를 개발할때 쓰는 개발 환경을 구성해보도록 하자.

> 이 포스트에 관련된 코드는</br></br>https://github.com/brightparagon/webpack-conquer/tree/development</br></br>에서 확인해볼 수 있습니다.

이 글은 다음과 같은 내용을 다룰 것이다.

1. webpack-dev-server
2. Dev server options: proxy, historyApiFallback, stats...
3. Source map

왜 이런 옵션들을 이용해서 개발 환경을 구성할까? 우선 webpack을 사용하는 환경이라면 대부분 [ 코드를 작성하고, babel 등을 이용해 트랜스파일하고, 결과물을 브라우저로 확인하는 ] 일련의 반복적이고 구조적인 과정이 잡혀있을 것이다. 간단한 웹을 만드는 경우에도 코드 수정 - 저장 - 브라우저 확인이라는 세가지 단계를 거치게 마련이다. 그런데 코드를 수정하고 결과물을 확인하는 일은 한두번으로 끝나지 않는다는 문제가 있다. 매번 이 작업을 수동으로 한다면 아주 귀찮은 일일 것이다.

webpack으로 이 과정을 자동화해주면 ctrl + s를 누르는 순간 변경 사항이 반영된 결과물을 브라우저에서 확인할 수 있다. 꽤나 큰 수고를 덜어줄 수 있어서 아주 편리한 기능이다.

## webpack-dev-server

위에서 언급한 작업을 해주는 webpack의 도구에는 아래와 같이 크게 세가지가 있다.

1. 기본적인 webpack cli + watch mode
2. webpack-dev-server
3. webpack-dev-middleware

이런 옵션들이 나뉘어있는 것은 다양한 환경에서 webpack으로 개발 환경을 구성할 수 있게 하기 위함이다. 1번은 단순히 모든 파일들을 감시하고 있다가 변경사항이 있을 경우 webpack config에 따라 리컴파일 한다. 다만, 변경 사항을 확인하기 위해서는 매번 브라우저를 새로고침 해줘야 한다. 2번은 express로 만들어진 간단한 web server이다. 이 옵션도 1번과 같이 변경 사항을 감지해 리컴파일을 한다. 그런데 1번과는 달리 브라우저를 리로드하고 더 다양한 configurable option들을 사용할 수 있다. proxy나 historyApiFallback 같은 것들이 이 옵션에 속한다. 3번은 2번에서 내부적으로 사용되는 subset인데 코드 변경시 webpack config 파일에 따라 컴파일한 코드를 내뱉는 역할만을 middleware로 패키징한 모듈이라고 이해하면 된다. 그래서 자체적으로 express server를 사용한다면 이 3번을 사용해 입맛에 맞게 서버와 함께 커스터마이즈 할 수 있다.

세 도구 모두 많이 쓰이지만 사이드 프로젝트를 셋업하는 등의 용도로서는 2번이 가장 많이 쓰인다는 경험하에 이 글에서는 webpack-dev-server를 다뤄보도록 하겠다.

먼저 npm install --dev webpack-dev-server 혹은 yarn add webpack-dev-server --dev를 터미널에 입력해 설치해보자. 그리고 저번 글에서 작성했던 webpack.config.js 파일을 아래와 같이 수정해 webpack-dev-server를 위한 설정을 추가해보자. 27 라인에 devServer라는 옵션이 추가되었다.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    app: path.resolve(__dirname, 'src', 'app.js'),
    bar: path.resolve(__dirname, 'src', 'bar.js'),
  },
  
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'CONQUER WEBPACK V4!',
      inject: true,
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],

  devServer: {
    port: 8000,
    inline: true,
  },
};
```
webpack.config.js

devServer 옵션에서 포트를 8000으로 주었고 inline 모드로 설정했다. 포트가 8000이기 때문에 브라우저에서 localhost:8000으로 접근할 수 있다. devServer를 사용할때 컴파일된 코드를 일반적인 template html에 삽입하는 inline 모드와 iframe에 넣어 업데이트하는 iframe 모드가 있는데 HMR이 inline 모드에서 지원이 되므로 여기서는 inline 모드를 사용하도록 하겠다.

이제 이 설정을 이용해 서버를 실행하기 위한 스크립트를 package.json 파일에 작성해서 개발을 할때마다 이 스크립트로 프로젝트를 실행할 수 있도록 해보자. 8 라인에 "start" key가 추가되었다.

```json
{
  "name": "webpack-conquer",
  "version": "1.0.0",
  "main": "index.js",
  "author": "brightparagon",
  "license": "MIT",
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server --config webpack.config.js"
  },
  "dependencies": {
    "clean-webpack-plugin": "^0.1.19",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.7.0"
  },
  "devDependencies": {
    "webpack-cli": "^2.1.2",
    "webpack-dev-server": "^3.1.4"
  }
}
```
package.json

webpack과 webpack-dev-server 두가지 도구 모두 --config 옵션을 주지 않으면 기본적으로 webpack.config.js 파일을 찾아서 사용하기 때문에 위 파일에서 "--config webpack.config.js"는 생략가능하다. 만약 config 파일명을 달리한다면 해당 부분을 변경해서 사용하면 되며 이후에 Production(운영 환경)을 위한 설정을 할때도 --config 옵션을 요긴하게 사용할 것이다.

이제 터미널에 **npm start** 또는 **yarn start**를 입력해 프로젝트를 실행해보자.

![webpack development](/images/webpack-dev.png)

위와 같이 나올 것이고 버튼도 잘 작동할 것이다. 그리고 app.js 파일을 열어 Hello 문구를 Hello Development로 수정한 뒤 저장하고 브라우저를 확인해보자.

![webpack development](/images/webpack-dev2.png)

위와 같이 자동으로 변경 사항이 반영되어 있고 full refresh까지 된 것을 확인할 수 있다. port와 inline 이외에도 devServer에 줄 수 있는 다양한 옵션이 있는데 대표적으로 아래와 같은 것들이 있다.

- proxy: 프로젝트 내에서 호출하는 외부 API나 다른 포트를 사용하는 로컬 서버 API가 있을 경우 이 API url들은 해당 서버로 호출하도록 우회할 수 있도록 만드는 옵션
- compress: gzip compression을 사용하는 옵션
- overlay: 에러가 발생했을때 브라우저에 풀스크린으로 에러 내용을 오버레이로 표시해주는 옵션
- hot: HotModuleReplacementPlugin을 사용해 HMR 기능을 이용하는 옵션
- historyApiFallback: HTML5의 History API를 사용하는 경우에 설정해놓은 url 이외의 url 경로로 접근했을때 404 responses를 받게 되는데 이때도 index.html을 서빙할지 결정하는 옵션이다. - React와 react-router-dom을 사용해 프로젝트를 만들때도 react-router-dom이 내부적으로 HTML5 History API를 사용하므로 미지정 경로로 이동했을때, 있는 경로지만 그 상태에서 refresh를 했을때와 같은 경우에도 애플리케이션이 적절히 서빙될 수 있어서 유용한 옵션이다.
- host: 기본적으로 애플리케이션은 localhost에서 서빙되지만 이 옵션을 이용해 다른 host를 지정해줄 수 있다. 또한 이 옵션에 '0.0.0.0'을 주면 개발중인 localhost를 외부에서 접근할 수 있다.

devServer에 사용할 수 있는 다양한 옵션에 대해 자세한 내용은 [이 링크](https://webpack.js.org/configuration/dev-server/)에서 확인하면 된다.

Source map으로 넘어가기 전에 위의 옵션들 중 몇가지를 사용해보자.

### overlay

```javascript
devServer: {
  port: 8000,
  inline: true,
  overlay: true,
},
```
webpack.config.js

위와 같이 devServer에 overlay 옵션을 true로 주고 app.js 파일에 일부러 잘못된 코드를 작성하자.

```javascript
function app() {
  const div = document.createElement('div');
  const btn = document.createElement('button');

  div.innerHTML = 'Hello';
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = bar;
  div.appendChild(bt

  return div;
}

document.body.appendChild(app());
```
app.js

8번 라인이 바뀌었다. appendChild 함수 실행부가 온전히 닫혀있지 않고 btn 변수명도 치다 말았다. 이렇게 변경하고 저장하면 브라우저에서 아래와 같은 화면이 나타날 것이다.

![webpack development](/images/webpack-dev3.png)

./src/app.js 에서 에러가 났고 문제가 되는 코드의 부분을 친절하게 알려준다. 이 옵션을 사용하지 않아도 개발자 도구 콘솔에서 알려주므로 꼭 사용하지 않아도 된다. 다만 에러가 났을때 확실하게 알려주는 것 같아서 필자는 꼭 쓰는 옵션이다.

### historyApiFallback

다시 app.js 파일을 원래대로 돌리고 브라우저 url 주소를 보자. localhost:8000 일 것이다. 아직 우리의 애플리케이션은 루트 경로 이외의 url에 해당하는 페이지를 만들지 않았다. localhost:8000/mypage 를 직접 입력해 접속해보자. 아래와 같은 화면이 나타날 것이다.

![webpack development](/images/webpack-dev4.png)

이 url로 접속하는 순간 webpack-dev-server(express server)는 mypage라는 라우팅 경로가 있는지 확인할 것이다. 그런데 아무런 라우팅 설정을 하지 않았기 때문에 Cannot GET 에러를 낸다. 애플리케이션은 에러가 난 상태로 가만히 있게 되는데 개발 중간에 이렇게 멈춰있으면 url을 다시 입력해 이동해야 하는 번거로움이 생긴다. 이때 아래와 같이 historyApiFallback 옵션을 사용하면 이런 번거로움을 피할 수 있다.

```javascript
devServer: {
  host: '0.0.0.0',
  port: 8000,
  overlay: true,
  historyApiFallback: true,
  // or
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: '/views/landing.html' },
      { from: /^\/subpage/, to: '/views/subpage.html' },
      { from: /./, to: '/views/404.html' },
    ],
  },
},
```
webpack.config.js

true를 주게되면 모든 404 responses에 대해 index.html로 리다이렉트를 하고 rewrites 옵션을 담은 객체를 주면 정규식을 이용해 더 복잡한 경우를 다룰 수 있다.

이제 아까와 같이 localhost:8000/mypage 경로에 다시 접속해보자. 곧장 접속해도, 이 경로에서 새로고침을 해도 애플리케이션이 서빙되는 것을 확인할 수 있다.

### host

웹 애플리케이션을 개발하다 보면 다양한 태블릿이나 모바일 기기로 화면 및 기능 동작을 확인하거나, 결제 모듈을 테스트하거나, 근처에 있는 팀원이 봐야하는 경우가 종종 생긴다. 이럴때 host 옵션을 사용하면 유용하다. 아래와 같이 설정해보자.

```javascript
devServer: {
  host: '0.0.0.0',
  port: 8000,
  overlay: true,
  historyApiFallback: true,
  host: '0.0.0.0'
},
```
webpack.config.js

이렇게 config 파일을 수정하면 앱을 재실행해주자. 그리고 맥이라면 터미널을 열어 **ifconfig | grep inet**을 입력해 현재 IP주소를 확인하자. 이제 태블릿이나 모바일 기기로 개발 중인 컴퓨터와 같은 와이파이에 접속한 다음 브라우저에서 방금 확인한 IP주소의 8000번 포트로 접속해보자. 예를 들어, 10.23.2.2:8000 과 같은 주소로 접속하면 된다. 필자는 모바일에서 접속했는데 아래와 같이 나온다.

![webpack development](/images/webpack-dev5.jpg)

이제 app.js 파일을 열어 div의 text를 이리저리 바꿔보면서 저장해보고 모바일 화면을 지켜보자. 아래와 같이 저장할 때마다 자동으로 업데이트 되는 것을 확인할 수 있다.

![webpack development](/images/webpack-dev6.gif)

정말 편하다! 이제 Source map을 알아볼 차례다.

## Source map

개발을 진행하다보면 점점 js 파일이 늘어나게 되는데 webpack은 여러 파일들을 하나 또는 특정 갯수의 bundled 파일로 묶다보니 error와 warning 메시지를 통해 어느 파일의 어느 코드에서 문제가 되는지 정확히 추적하기가 어려워진다. 이럴때 Source map을 사용하면 원본 파일을 통해 코드를 보여주고 error 및 warning 메세지도 정확한 파일명과 코드 위치를 짚어주기 때문에 유용하다.

bar.js 파일에서 아래와 같이 일부러 버그를 심어놓자.

```javascript
function bar() {
  cosnole.log("I'm a bar!");
}

export default bar;
```
bar.js

console을 cosnole라고 바꿨다. webpack v4 공식 다큐먼트에서 에러를 이렇게 심었다 ㅎㅎ. 그리고 앱을 재시작하고 버튼을 클릭해보자. 그리고 개발자 도구의 콘솔을 열어보자.

![webpack development](/images/webpack-dev7.png)

버튼을 누르면 이렇게 cosnole이 선언되어 있지 않다는 레퍼런스 에러를 뿜을 것이다. 그리고 이 에러 옆에 에러가 난 파일명과 몇번 라인인지 표시가 되어있다. 파일명을 클릭해보자.

![webpack development](/images/webpack-dev8.png)

webpack이 실컷 빌드한 코드로 연결하고 있음을 알 수 있다. webpack_require... 같은 코드가 보인다. 아직은 코드가 간단해서 볼만(?) 하지만 거대해지면 더욱 보기가 어려울 것이다. 이 에러를 보다 더 눈이 덜 아프고 깨끗하게 추적할 수 있도록 webpack config 파일을 아래와 같이 수정해보자.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    app: path.resolve(__dirname, 'src', 'app.js'),
    bar: path.resolve(__dirname, 'src', 'bar.js')
  },

  ...
};
```
webpack.config.js

4번 라인에 devtool 옵션이 추가되었고 'inline-source-map' 이라는 값을 주었다. 저장하고 앱 재실행 뒤 다시 버튼을 클릭해보자. 이번엔 아래처럼 조금 다르게 표시될 것이다.

![webpack development](/images/webpack-dev9.png)

벌써 여기부터 조금 깔끔해졌다. 파일명에 군더더기도 없고 정확한 코드 라인을 표기하고 있다. 파일명을 클릭해보자.

![webpack development](/images/webpack-dev10.png)

전과는 달리 정확히 원본 파일을 보여주면서 에러가 난 라인도 잘 나타내고 있다. 이렇게 유용한 옵션이긴 하지만 webpack은 이를 위해 내부적으로 빌드된 파일과 원본 파일간의 관계를 나타내는 매핑 파일을 따로 만든다. 이걸 매 빌드마다 새로 만들어내므로 프로젝트가 거대해지면 한번 저장하고 변경 사항이 반영되기까지 상당한 시간이 걸린다. 필자가 만드는 리액트 프로젝트의 경우 총 11,000 라인 정도의 코드로 이루어져있는데 반영까지 체감상 3~4초 정도 걸리는 것 같다. 어찌보면 양날의 검일 수도 있어서 개발자들에 따라 이 옵션을 사용하지 않고 본능(?)으로 어느 부분이 잘못되었는지 추측하려 노력하는 경우도 있고(이 방법이 생각을 많이 하게 해서 좀 더 논리적인 사고를 하게 만드는 것 같다. 처음엔 무지 힘들긴 하지만..) 빠른 빌드를 위해 아예 사용하지 않거나 'inline-source-map' 이외의 다른 옵션을 사용하기도 한다. 개발과 운영 모드에서 사용할 수 있는 옵션이 서로 다르고 개발과 운영 각각에서도 옵션이 다양하게 존재하는데 이에 대해서는 [이 링크](https://webpack.js.org/configuration/devtool/)에서 확인하면 된다. webpack 공식 문서에서는 개발 모드에서는 'eval-source-map' 또는 'cheap-eval-source-map'를, 운영 모드에서는 none(아예 사용하지 않음) 또는 'hidden-source-map' 정도를 권장하고 있다. 필자의 프로젝트에서는 아직 크기가 아주 크지는 않기 때문에 개발 모드에서는 'source-map'을, 운영 모드에서는 'hidden-source-map'을 사용하고 있다.

> 이 포스트에 관련된 코드는</br></br>https://github.com/brightparagon/webpack-conquer/tree/development</br></br>에서 확인해볼 수 있습니다.

Reference
- https://webpack.js.org/guides/development/
- https://webpack.js.org/configuration/dev-server
- https://github.com/webpack/docs/wiki/webpack-dev-server
