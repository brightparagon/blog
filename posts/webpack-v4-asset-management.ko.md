---
key: 'webpack-v4-asset-management'
title: '[webpack v4] Asset Management'
createdAt: '04-08-2018 15:10'
thumbnail: '/images/webpack2.png'
categories: ['development', 'webpack']
tags: ['css', 'asset', 'bundler', 'guide', 'webpack', 'javascript']
---
# [webpack v4] Asset Management

## 들어가며

[저번 글](/posts/webpack-v4-start)에서는 간단한 js 파일 하나를 번들링해서 index.html 파일에서 사용하도록 만들었다. 그런데 우리가 웹 애플리케이션을 만들때 JavaScript 파일만 쓰지는 않지 않은가? 스타일링을 위해 CSS 파일을 만들고, 사진을 보여주기 위해 jpg, png 등의 이미지 파일을 추가하고, 때로는 글씨체를 위해 font 파일이나 json 파일을 사용하기도 한다. 이때 사용되는 모든 종류의 파일들은 CDN과 같은 외부링크로 불러들이지 않는 이상 우리 프로젝트 디렉토리 내에 존재한다. 물론 webpack은 js 이외의 파일들도 번들링 해준다. 이 파일들을 각각 하나의 JavaScript 모듈로 만들어 js 파일과 마찬가지로 dependency graph로 관리한다. 이번 글에서는 이런 asset을 webpack으로 어떻게 관리하는지 알아보자.

## CSS를 사용하는 웹을 만들어보자

> 이 포스트에 관련된 코드는</br></br>https://github.com/brightparagon/webpack-conquer/tree/asset-management</br></br>에서 확인해볼 수 있습니다.

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
index.html

```javascript
import './style.css';

function app() {
  const division = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Hello Webpack!';
  h1.className = 'Hello';

  division.appendChild(h1);

  return division;
}

document.body.appendChild(app());
```
app.js

```css
.hello {
  background-color: coral;
  font-family: 'Roboto Mono';
}
```
style.css

이전 예시와 크게 다르지 않다. app.js는 h1이 들어있는 div를 만들고 body에 붙인다. 몇가지 차이점은 파일 상단에서 style.css 파일을 불러오고 h1에 className을 'hello'로 정하고 있다. 그런데 app.js를 보면 css 파일을 import 하고 있다. index.html에는 css 파일을 불러오는 링크는 없는데 어떻게 h1에 css를 적용하는 걸까. 아래의 webpack config를 보자.

```javascript
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
```
webpack.config.js

entry와 output은 전 예제와 변함없다. module 프로퍼티가 새로 생겼는데 이곳에서 우리가 원하는 파일들을 webpack이 불러올 수 있도록 각 파일에 맞는 loader를 지정한다. 지금 우리는 css 파일을 불러들일 것이므로 .css 확장자를 가진 파일들을 style-loader와 css-loader로 불러들이도록 설정하고 있다. 이때 webpack은 아래에서 위로 loader를 적용한다. css-loader가 먼저 css 파일을 읽어들이고 그 결과물을 style-loader가 index.html의 head 태그에 삽입한다. 그래서 만약 scss를 사용한다면 먼저 scss 파일을 css 파일로 변환해야 하기 때문에 sass-loader를 맨 아래에서 필요한 옵션과 함께 지정해주면 된다. 이제 설정 파일 준비가 끝났으니 npm run  build나 yarn build 명령어를 통해 빌드하고 브라우저에서 index.html을 열어보자.

![hello webpack](/images/hello-webpack.png)
![hello webpack](/images/hello-webpack2.png)

css가 적용이 된 h1이 보인다. 개발자 도구를 열어 Elements 탭을 보니 head 태그에 style 태그가 삽입되어 있는 것을 볼 수 있다. 만약 app.js에서 다른 js 파일을 불러와 사용하고 그 파일에서도 css를 사용하면 어떻게 될까? 그리고 이미지 파일은 어떻게 불러올까? json 파일이나 font는?

위에서 만든 js, css 파일들을 수정해보자.

```javascript
import bar from './bar';
import './style.css';
import the1975 from './the1975.jpg'
import exampleJsonData from './data.json';

function app() {
  const division = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Hello Webpack!';
  h1.className = 'another';

  const img = new Image();
  img.className = 'center';
  img.src = the1975;

  division.appendChild(h1);
  division.appendChild(img);

  console.log(exampleJsonData);

  return division;
}

document.body.appendChild(app());
document.body.appendChild(bar());
```
app.js

```css
@font-face {
  font-family: 'Roboto Mono';
  src: url('./RobotoMono-Regular.ttf') format('ttf');
  font-weight: 600;
  font-style: normal;
}

.hello {
  background-color: coral;
  font-family: 'Roboto Mono';
}

.center {
  margin: 0 auto;
}
```
style.css

```javascript
import './another.css';

function bar() {
  const contents = document.createElement('h3');
  contents.innerHTML = 'Another Element!'
  contents.className = 'another';

  return contents;
}

export default bar;
```
bar.js

```css
.another {
  background-color: mediumseagreen;
}
```
another.css

```javascript
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
```
webpack.config.js

app.js에서 새로 만든 bar.js 파일과 the1975 이미지, data.json 파일을 불러오고 있다. style.css 에서는 이미지에 적용할 center class를 추가했고 새로운 폰트 파일을 불러오고 있다. 이미지, json, font 파일은 컴퓨터에 저장되어 있는 것을 활용했다. bar.js는 app.js와 비슷하게 another라는 css 파일을 사용하고 h3 태그를 만들어 반환한다.

webpack.config.js 파일의 module에 두 부분이 추가됐다. file-loader를 사용해 이미지 파일과 각종 폰트 파일을 불러올 수 있도록 만들었다. 이외에도 csv, tsv 파일 등을 csv-loader로 불러올 수 있다. 다시 빌드해서 브라우저로 열어보자.

![hello webpack](/images/hello-webpack3.png)
![hello webpack](/images/hello-webpack4.png)

the1975(아주 좋아하는 밴드..) 이미지와 bar.js의 결과가 잘 나오고 있다. 그런데 Elements 탭을 보니 head tag에 style tag가 두개가 있다. style-loader는 css 파일을 부르는 js 파일을 만날때마다 style tag를 삽입하는 것을 알 수 있다. 만약 프로젝트가 점점 커지고 css 파일도 많아지면 html 파일도 불필요하게 커지게 될 것이다. 그래서 style-loader는 production으로는 그렇게 좋은 선택은 아니다. 이때 css 파일을 개별적으로 추출하고 caching까지 할 수 있는 extract-text-webpack-plugin 이라는 좋은 플러그인이 있다. 이 웹팩 시리즈에서 이후에 production에서 이 플러그인을 사용하는 것을 다룰 것이다.

## CSS Module

지금까지 style.css, another.css 이라는 두 파일을 만들었다. 그런데 만약 style.css에 있던 hello 라는 클래스의 이름이 another로 바뀌게 되면 어떻게 될까? another.css에도 another라는 클래스가 있는데 중복되지 않을까?

```javascript
import bar from './bar';
import './style.css';
import the1975 from './the1975.jpg'
import exampleJsonData from './data.json';

function app() {
  const division = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Hello Webpack!';
  // h1.className = 'hello';
  h1.className = 'another';

  const img = new Image();
  img.className = 'center';
  img.src = the1975;

  division.appendChild(h1);
  division.appendChild(img);

  console.log(exampleJsonData);

  return division;
}

document.body.appendChild(app());
document.body.appendChild(bar());
```
app.js

```css
/* .hello { */
.another {
  background-color: coral;
  font-family: 'Roboto Mono';
}
```
style.css

위와 같이 app.js와 style.css 파일을 변경해보고 다시 빌드해서 결과를 확인해보자.

![hello webpack](/images/hello-webpack5.png)
![hello webpack](/images/hello-webpack6.png)

두개의 another 클래스는 다른 내용을 담고 있지만 style-loader에 의해 두개의 style 태그가 삽입되고 아래에 있는 style 태그의 another 클래스가 위의 클래스를 덮어씌우게 되어(중복된 클래스의 경우 나중에 오는 클래스가 우선순위를 갖는다) h1와 h3 둘 모두 배경색이 coral이 되었다. 프로젝트가 점점 커지면 스타일링도 여러 개발자가 하게 될 수 있고 점점 클래스 네이밍이 중요해진다. 일정한 규칙에 따라 이름을 짓기도 하고 개발자 나름의 묘책을 세워 만들 수도 있다. 그럼에도 파일이 더 복잡해질 수록 트래킹이 어려워지고 결국 중복되는 지점이 찾아오는데 이때 CSS Module을 사용하면 이 문제를 해결할 수 있다. CSS Module은 css 파일 하나하나를 개별적인 모듈로 간주하고 css-loader가 option에 주어지는 규칙에 따라 css 파일의 이름과 DOM에 들어갈 css 클래스명을 결정함을 의미한다. webpack config 파일과 app.js, bar.js 파일을 아래와 같이 수정해보자.

```javascript
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.js'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          // 'css-loader'
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
};
```
webpack.config.js

```javascript
import bar from './bar';
// import './style.css';
import styles from './style.css';
import the1975 from './the1975.jpg'
import exampleJsonData from './data.json';

function app() {
  const division = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Hello Webpack!';
  // h1.className = 'another';
  h1.className = styles.another;

  const img = new Image();
  // img.className = 'center';
  img.className = styles.center;
  img.src = the1975;

  division.appendChild(h1);
  division.appendChild(img);

  console.log(exampleJsonData);

  return division;
}

document.body.appendChild(app());
document.body.appendChild(bar());
```
app.js

```javascript
// import './another.css';
import styles from './another.css';

function bar() {
  const contents = document.createElement('h3');
  contents.innerHTML = 'Another Element!'
  // contents.className = 'another';
  contents.className = styles.another;

  return contents;
}

export default bar;
```
bar.js

webpack.config.js 파일에서 css-loader 설정 부분을 변경했다. modules option을 true로 하고 localIdentName option에 일정한 규칙을 주었다. 이 부분은 css-loader document를 참고하면 된다. localIdentName를 살펴보자. path는 css 파일의 디렉토리 경로, name은 css 파일의 이름, local은 css selector 이름이고 마지막 hash는 매 build 마다 파일에 변경 사항이 있을때 자동으로 변경되는 부분이다. 이 옵션으로 우리는 개발 중일때 파일별로 중복되는 css 클래스명이 있어도 우리 의도대로 스타일링을 할 수 있다. 그리고 app.js와 bar.js에서 css를 불러오고 클래스명을 적용하는 부분이 바뀐 점을 주목하자.

예를 들어, book 화면에 적용할 list class를 만들고, user 화면에 적용할 list class를 만들면 list 라는 이름이 중복되어도 개발 중일때 list-book, list-user 와 같이 불편한 작업을 하지 않아도 되어 직관적으로 스타일링을 할 수 있다. 이외에도 sass-loader(sass-loader에도 동일한 modules option을 사용할 수 있다)를 사용하거나 styled-component를 사용할 수도 있다.

이제 빌드해보고 브라우저에서 결과를 확인해보자.

![hello webpack](/images/hello-webpack7.png)

localIdentName의 규칙대로 css class 이름이 만들어진 것을 확인할 수 있다.

> 이 포스트에 관련된 코드는</br></br>https://github.com/brightparagon/webpack-conquer/tree/asset-management</br></br>에서 확인해볼 수 있습니다.
