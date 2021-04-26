---
key: 'webpack-v4-start'
title: '[webpack v4] webpack v4 시작하기'
createdAt: '02-23-2018 02:28'
thumbnail: '/images/webpack2.png'
categories: ['development', 'webpack']
tags: ['amd', 'commonjs', 'bundler', 'guide', 'webpack', 'javascript']
---
# [webpack v4] webpack v4 시작하기

## 들어가며

2016년 초반 즈음 react에 입문해 개발을 시작하게 되었다. 웬걸, react를 하려고 봤더니 이것만으로는 웹을 만들기가 번거로워 여러(꽤 많은...) 도구들이 거의 필수적으로 사용해야 함을 알게되었다. redux도 redux지만 그중에서도 오랜 시간에 걸쳐 머리를 지속적으로 아프게 했던 것은 단연 webpack이다. 처음 사용했을때 버전이 1이었는데 해가 바뀌기가 무섭게 메이저 버전이 2로 뛰더니 여러 부분에서 사용 방식이나 문법 등이 바뀌어서 잊을만하면 재학습을 요구했다.

그래서 쓴다. 나를 위한 webpack v4 정리 시리즈. 이제와 생각해보니 redux도, redux-saga도 참 어려웠지만 유독 webpack이 골치아팠던 이유는 특히 UI Library인 react를 사용함으로써 개발 과정에서 필요한 UI 이외의 많은 부분들을 webpack이 커버하기 때문이었다. 프레임워크를 생각해보면 이해가 쉽다. 프레임워크가 제공하던 인터페이스가 없으므로 예를 들어 MVC에서 V만 지원되는 상태에서 다른 라이브러리들로 MC를 구성하고 이것을 V와 함께 일관된 패러다임 하에 서로 꿰매고 컨트롤해야 한다. 다시 말해, webpack은 개발 사이클의 전반적인 부분에 관여하기 때문에 웹 개발의 큰 구조를 어느정도 이해하고 있지 않은 경우엔 쉽고 직관적으로 활용하기가 어렵다. 갈 수록 더 많은 option과 보조하는 plugin들이 많아지는 것은 react의 활약을 포함한 Modern Web Development의 흐름 변화와 무관하지 않다.

이런 배경에서 webpack 활용에 대해 아주 기초적인 것부터 복잡한 것까지 천천히 그리고 아주 자세히 정리해보고자 한다. 버전이 또 바뀌어 사용법이나 문법이 바뀌더라도 정리한 것을 바탕으로 내 머리를 업데이트하면 되므로 이 시리즈를 webpack 활용에 대한 형상관리라고 해두면 되겠다.

## 아주 간단한 웹을 bundle 해보자

> 이 포스트에 관련된 코드는 </br></br>https://github.com/brightparagon/webpack-conquer/tree/getting-started</br></br>에서 확인해볼 수 있습니다. 작은 예제부터 모두 실행해보며 학습해보고 싶으신 분은 위 링크에서 레파지토리를 fork 하거나 zip 파일을 다운로드해서 활용해보세요.

시작하기 전에 준비물이 몇가지 있다.

- 코드를 작성할 적절한 에디터 like Sublime Text, Atom, VS Code
- 외부 모듈을 설치하고 관리해줄 npm 또는 yarn

이제 간단한 웹을 구성해보자.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CONQUER WEBPACK V4</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
앞으로 계속 고생해줄 index.html

```javascript
function app() {
  // h1 tag를 만든다.
  const contents = document.createElement('h1');
  contents.innerHTML = 'Hello Webpack v4!'

  return contents;
}

// app 함수가 반환한 h1 tag를 body tag에 렌더링한다.
document.body.appendChild(app());
```
indext.html에서 불러와 사용할 app.js

app.js를 번들해 index.html에서 사용할 것이다. 이때 app.js 말고도 다른 파일들도 함께 번들될 수 있고 이렇게 번들된 결과를 지금은 bundle.js라고 부르자. 그래서 index.html에서 app.js 대신 bundle.js를 불러오고 있다.

app.js에서는 h1 tag를 만들어 body에 붙이고 있다. 이 간단한 웹을 앞으로 점점 커져갈 우리의 프로젝트라고 생각하자.

이제 이것을 번들 해볼건데 이때 번들되는 대상은 우리의 web application을 동작하게 해줄 요소들이다. 이 요소들에는 js, css, image 등이 있다. 여기서 js 파일이 확장되면 react나 vue로 만들어진 앱도 webpack으로 번들될 수 있다.

이제 번들하기 위해 webpack을 설치해보자.

```bash
npm install webpack --save-dev
or
yarn add webpack
```

webpack을 설치할때 -g 옵션 등을 주어 글로벌로 설치하는 것보다 프로젝트 내부에 설치하는 것을 권장한다. webpack의 버전, 나아가 프로젝트 dependencies의 버전들이 서로 의존적일 수 있기 때문이다. 더불어 이렇게 하는 것이 다른 개발자나 다른 팀이 프로젝트 셋업을 빠르게 하는데 수월하다.

```json
"scripts: {
  "build": "webpack"
}
```
package.json

webpack을 글로벌로 설치하지 않았다면 터미널에서 webpack 명령어를 사용할 수 없다. 따라서 package.json의 scripts에 위와 같이 입력해 npm run build 혹은 yarn build로 webpack 명령어를 사용할 수 있도록 하자. 이때 webpack 명령어를 실행할 수 있는 것은 node_modules에 있는 webpack을 npm이 찾아주기 때문이다.

그 다음 webpack이 무엇을 어떻게 번들할 것인지에 대해 정해줄 수 있는 설정 파일을 작성해보자.

```javascript
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
};
```
webpack.config.js

당장 지금은 9줄로 아주 간단하다. webpack으로 할 수 있는 것이 아주 다양한 만큼 이 파일은 앞으로 더 복잡해질 것이니 지금부터 기초를 단단히 잡아두자.

이 파일에서는 객체 하나를 내보내고 있다. 이를 webpack이 읽어 사용할 것이다. 객체 안의 속성을 하나씩 살펴보자. 먼저 4번째 줄의 entry는 webpack이 번들을 진행할 첫 진입 파일을 명시한다. webpack은 진입 파일을 시작점으로 이 파일과과 import 혹은 require로 연결된 모든 파일들 간의 관계를 dependency graph로 만들어 이것을 기준으로 번들링을 진행한다. 따라서 만약 app.js 에서 const bar = require('./bar.js')와 같이 다른 파일을 불러들이면 이를 의존 관계로 보고 bar.js까지 번들 결과에 포함시킨다. 그럼 당연히 여러 파일을 작성하더라도 index.html에서 여러 script tag로 그 파일들을 일일이 불러주지 않아도 된다. 그 다음, 5번째 줄의 output은 번들링 결과를 저장할 경로(path)와 파일 이름(filename)을 결정하고 있다. 즉, entry에서 명시된 진입 파일을 기준으로 모든 파일을 하나로 묶고 이름을 bundle.js로 지어 path에 명시된 경로로 저장하게 된다.

이때 entry와 output path에서 Node.js의 path 내장 모듈(webpack은 Node.js 환경 위에서 움직인다)을 사용해 path.resolve(__dirname, ...)와 같이 경로를 지정하고 있는데 여기에 대해서는 다른 글에서 다뤄보도록 하겠다. __dirname은 현재 프로젝트의 경로를 의미한다. 현재 경로가 /Users/brightparagon/Documents/workspace/webpack-conquer라면 entry의 결과는 /Users/brightparagon/Documents/workspace/webpack-conquer/src/app.js가 되고 output path의 결과는 /Users/brightparagon/Documents/workspace/webpack-conquer/build가 된다. 이제 번들을 해볼 차례다. 아래 명령어를 실행해보자.

```bash
npm run build
or
yarn build
```

build 폴더 내부를 보면 bundle.js이 생성되어 있을 것이다. 아래는 현재 프로젝트의 디렉토리 구조다.

![webpack direcotry](/images/webpack-dir.png)
디렉토리 구조

index.html이 build 폴더 내에 있고 webpack에 의해 생긴 bundle.js가 함께 있다. 이렇게 우리의 첫번째 번들링 과정이 완성되었다. 이제 브라우저를 열고 index.html을 열어보자.

![webpack direcotry](/images/webpack-work.png)
정상적으로 동작하는 것을 확인할 수 있다!

## 웹에서의 module과 webpack의 역할

위의 예제를 이어서 생각해보자. 지금은 app.js 파일 하나만 있고 이 파일 마저도 코드의 양이 많지 않다. 그런데 이제 로그인 기능을 붙이고, 홈페이지에서 사진을 보여주고, 네비게이션을 붙여 여러 페이지로 이동시키는 등 필요한 기능이 늘어감에 따라 한 js 파일에서 다루는 코드의 양이 점점 늘어날 것이다.

여러 기능을 한 파일에서 다루면 기능 추가나 수정이 필요할때 쉽게 접근하기 어렵다. 그래서 기능별로 파일을 나눌 필요가 생기고 어느 파일이 어느 파일을 불러 사용하는 등의 의존 관계가 생기게 된다. C++이나 Java에 익숙하다면 JavaScript에 모듈 시스템이 따로 없는 것을 받아들이기 힘들 것이다. 필자는 처음 JavaScript를 접하고 공부할때 require()가 언어가 자체적으로 지원하는 함수인줄 알았는데 브라우저에서는 지원되지 않는 것을 알고 문화컬쳐에 빠졌다.. 이에 JavaScript를 범용적 언어로서 활용하기 위한 움직임이 일었고 표준화 작업에 있어 CommonJS와 AMD가 이끌어가고 있다. Node.js도 이런 움직임에 영향을 받았다. 더 자세한 것은 14만번 정도 조회된 [스택오버플로우 링크](https://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs)에서 찾아보자.

이것이 어떤 의미인지 알아보기 위해 위 예제에서 src 폴더에 아래와 같이 bar.js를 만들고 app.js에서 불러오는 코드를 만들어보자.

```javascript
const bar = require('./bar.js');
// or
import bar from './bar';

function app() {
  const contents = document.createElement('h1');
  contents.innerHTML = 'Hello' + bar();

  return contents;
}

document.body.appendChild(app());

// bar.js
function bar() {
  const string = ' Webpack!';
  return string;
}

module.exports = bar;
// or
export default bar;
```
app.js와 bar.js

이번엔 webpack을 활용하지 않고 index.html에서 script 태그의 src 속성 값을 "../src/app.js"로 수정하고 브라우저로 다시 열어보자.

![console](/images/console.png)

개발자 도구를 열어 Console 탭을 확인해보면 이와 비슷한 에러를 볼 수 있다. 저 Unexpected identifier는 import from 구문을 의미한다. 만약 require를 사용했다면 require is not defined와 같은 에러를 뱉는다. 그렇다. 브라우저엔 정말 당연히 있을 것 같은 모듈 시스템이 없다.

Modern Web Development의 많은 비중을 JavaScript가 잠식해가고 있는 만큼 webpack이 건네는 도움의 손길은 더욱 크게 느껴진다. 부족한 모듈 시스템을 브라우저가 알아듣게끔 대신 설명해주고, 동시에 개발자인 우리에게는 모듈 시스템을 이용해 손쉽게 파일들을 모듈화할 수 있도록 도와준다. 벌써 v4의 베타 버전이 올라왔고 더 많은 개선 사항이 포함되어 있다. webpack은 모듈화 말고도 훨씬 더 멋진 기능들을 갖고 있다. 가령,  bundle.js가 너무 비대해지면 이것을 쪼개 parallel로 불러오게끔 만들어 초기 로딩 속도를 개선시킬 수도 있고, 심지어 SPA의 경우엔 라우팅 경로를 구분해 처음엔 필요한 번들만 불러오고 경로에 따라 알맞은 파일만 그때그때 불러와 앱을 가볍게 느껴주게 할 수도 있다. 또, 개발 과정을 단순화하고 코드 변경에 따른 앱 리로딩을 자동으로 해주며 [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/)를 지원하는 플러그인을 사용할 수도 있다. 걸작이다. 근데 이 모든 것을 사용하려면 많이, 아주 많이 복잡하다. ~~그래서 요새 많이 parcel로 넘어가는 듯 하지만.. 필자는 webpack이 더 프로덕트 친화적이라 생각해 webpack에 잔류할 생각이다..~~ 앞으로 연재할 webpack 포스트들에서 이런 멋진 기능들을 예제로 직접 만들어보면서 사용해보도록 하자.

> 이 포스트에 관련된 코드는 </br></br>https://github.com/brightparagon/webpack-conquer/tree/getting-started</br></br>에서 확인해볼 수 있습니다. 작은 예제부터 모두 실행해보며 학습해보고 싶으신 분은 위 링크에서 레파지토리를 fork 하거나 zip 파일을 다운로드해서 활용해보세요.
