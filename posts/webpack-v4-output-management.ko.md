---
key: 'webpack-v4-output-management'
title: '[webpack v4] Output Management'
description: ''
createdAt: '05-06-2018 11:16'
thumbnail: '/images/webpack2.png'
categories: ['development', 'webpack']
tags: ['build', 'cleanwebpackplugin', 'htmlwebpackplugin', 'bundler', 'guide', 'webpack', 'javascript']
---
# [webpack v4] Output Management

[저번 Asset Management 편](/posts/webpack-v4-asset-management)에서 index.html에 번들된 app.js와 bar.js를 불러와 사용했었다. 이번에도 비슷하게 시작해보자. 단, 이번에는 두개의 entry point로 만들어보자.

```javascript
const path = require('path');

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
};
```
webpack.config.js

이렇게 복수의 entry point를 명시하면 webpack은 각 entry point마다 완전히 독립적인 dependency graph를 만든다. 흠.. 이걸 왜 하는걸까? 이후에 다른 글(CommonsChunkPlugin 관련)에서 더 설명하겠지만 이렇게 여러 entry point를 만들면 CommonsChunkPlugin를 이용해 앱을 원하는 청크들로 분리할 수 있다. 이렇게 분리하면 처음 웹앱을 접근할때 모든 js 파일들을 한꺼번에 불러오지 않고 dependency graph에 따라 그때그때(예를 들어 route 경로 변경) 필요한 js 파일을 불러오게 된다. 결론적으로 첫 랜딩 시간을 줄일 수 있다. real-world use case에서는 웹앱의 entry인 app과 앱에서 사용하는 third-party library들을 vendor라는 entry point로 묶는 방법을 많이 사용한다. 당연히 vendor가 각종 library들의 집합이므로 무거우니 이를 필요한 시기에 불러오면 효율적일 것이다.

webpack.config.js 파일을 위와 같이 만들고 yarn build 혹은 npm run build로 빌드를 해보면 두개의 번들 파일이 생긴다. 이외에도 entry point는 배열을 받을 수도 있는데 배열을 쓰게 되면 js 파일들이 여러개로 나뉘어 있을때 간단하게 하나의 entry point로 묶을 수 있다. entry point 전략에 대해 공식적인 설명이 궁금하면 이 글을 참고하자.

자, 이것이 우리의 실제 프로젝트라고 생각해보면 아래와 같은 일들이 생길 수 있다.

- app.js의 파일명이 바뀐다
- apple.js라는 새로운 js 파일이 생긴다
- bar.js 파일이 삭제된다

이런 일들이 일어났을때 index.html의 script tag는 변경 사항을 반영해야만 의도된 결과를 얻는다. 거기다 output filename 설정에 hash라도 해놓으면 파일이 변경되면 매 build 마다 이름이 변경되어 index.html에 매번 반영해주기가 귀찮게 된다. webpack이 알아서 똑똑하게 현재 쓰이는/안쓰이는 파일을 구분해줬으면 좋겠지만 그러지 못하는게 아쉽다.

## html-webpack-plugin comes to the rescue!

다행히 webpack 초창기부터 html-webpack-plugin이라는 플러그인이 생겼는데 이 문제를 해결해준다. yarn add html-webpack-plugin 혹은 npm install html-webpack-plugin --dev로 설치하고 webpack.config.js를 아래와 같이 수정해보자.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new HtmlWebpackPlugin({
      title: 'CONQUER WEBPACK V4!',
      inject: true,
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};
```
webpack.config.js

설치한 html-webpack-plugin를 불러오고 plugins 옵션에서 위와 같이 사용하고 있다. 이 플러그인은 Default로 아주 간단한 index.html을 사용해 자동으로 번들 결과를 script tag에 반영해주므로 더이상 index.html 파일을 따로 갖고 있지 않아도 된다.

html-webpack-plugin 옵션으로 title, inject, template 옵션을 사용하고 있는데 만약 우리가 우리만의 index.html을 사용하고 싶다면 template 옵션에 우리가 관리할 index.html 파일의 경로를 명시해주면 된다. 예를 들어, head tag에 cdn으로 style이나 폰트를 불러와 사용하고 번들 파일만 webpack이 자동으로 넣어주는 방식으로 사용할 수 있다. 그리고 inject 옵션을 true로 주었는데 Default로 true가 잡힌다. 이 옵션이 true 혹은 'body'일 경우엔 플러그인이 body tag에 script tag를 삽입해주고 'head'일 경우엔 head tag에 삽입한다. 자세한 것은 [공식 문서](https://github.com/jantimon/html-webpack-plugin)에서 확인해보자.

## clean-webpack-plugin

뭔가 편해진 것 같은데 아직 한가지 문제가 더 있다. 우리는 앞으로 build를 계속할텐데 번들 파일들이 build 폴더에 계속 쌓이고 있다. 이름이 같으면 덮어씌워지지만 다르면 계속 파일이 늘어난다. 이미 번들된 파일의 기존 파일이 지워졌을 수도 있고 파일명이 변경되어 새 번들 파일이 생겼을 수도 있다. 이 문제는 clean-webpack-plugin으로 간단하게 해결할 수 있다.

yarn add clean-webpack-plugin 혹은 npm install clean-webpack-plugin --dev로 설치하고 webpack.config.js 파일을 아래와 같이 수정하자.

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
};
```
webpack.config.js

지금껏 번들된 파일들은 build 폴더에 넣고 있었다. clean-webpack-plugin을 불러와 plugins 옵션에서 위와 같이 설정해주면 build 폴더를 매 build 마다 clean-webpack-plugin이 build 폴더를 먼저 비우고 html-webpack-plugin이 그 다음 index.html template에 번들 결과를 삽입하고 build 폴더에 결과물을 저장한다. 이제 build 사이클을 어느 정도 완성했다. 더이상 build 폴더를 직접 관리해주어야 하는 일이 사라지게 되었다.

> 이 포스트에 관련된 코드는</br></br>https://github.com/brightparagon/webpack-conquer/tree/output-management</br></br>에서 확인해볼 수 있습니다.
