#### 1.css module 模组化

- 每个 jsx 或者 tsx 文件就被视为一个独立存在的原件

- 原件所包含的所有内容也同样都应该是独立存在的

- ```jsx
  import './index.css'
  // 换为 通过访问对象来独立加载样式
  import style from './index.css'
  ```

  

#### 2.TS 的定义声明

TS 不能直接识别 .css 的文件，所以我们需要定义声明

- 文件后缀： *.d.ts
- 只包含类型声明，不包含逻辑
- 不会被编译，也不会被 webpack 打包



#### 3.CSS in JS （JSS）

- 动态注入

```JSX
import style from './index.css'
<div className = { styles.app }>
```

## JSS 是什么

简单来说，一句话概括CSS in JS (JSS)，就是"行内样式"（inline style）和"行内脚本"（inline script）。

因为，自从React出现以后，基于组件化的要求，强制把HTML、CSS、JavaScript捆绑在一起，在同一个文件里面，封装了结构、样式、以及逻辑。这虽然违背html发明初期的"关注点分离"的原则，但更有利于组件之间的隔离。而每个组件包含了所有需要用到的代码，不必依赖外部环境，组件之间没有耦合。所以，随着 React 的走红和组件模式深入人心，“关注点分离”原则越发淡出人们的视野，而React所带来的"关注点混合"的原则逐渐成为主流。[1]

React 对 CSS 封装非常简单，就是沿用了 DOM 的 style 属性对象。CSS-in-JS是一种技术（technique），而不是一个具体的库实现（library）。简单来说CSS-in-JS就是将应用的CSS样式写在JavaScript文件里面，而不是独立为一些.css，.scss或者less之类的文件，这样你就可以在CSS中使用一些属于JS的诸如模块声明，变量定义，函数调用和条件判断等语言特性来提供灵活的可扩展的样式定义。值得一提的是，虽然CSS-in-JS不是一种很新的技术，可是它在国内普及度好像并不是很高，它当初的出现是因为一些component-based的Web框架（例如React，Vue和Angular）的逐渐流行，使得开发者也想将组件的CSS样式也一块封装到组件中去以解决原生CSS写法的一系列问题。还有就是CSS-in-JS在React社区的热度是最高的，这是因为React本身不会管用户怎么去为组件定义样式的问题，而Vue和Angular都有属于框架自己的一套定义样式的方案。[2]

## JSS 的常见实现

由于React 对 CSS 的封装非常弱，导致出现了一系列的第三方库，用来加强 React 的 CSS 操作。它们统称为 CSS in JS，意思就是使用 JS 语言写 CSS。根据不完全统计，各种 CSS in JS 的库至少有47种。老实说，现在也看不出来，哪一个库会变成主流。[1]

### 1. Styled-components

    首先声明，本人极度厌恶这种方式。原因有2，第一，必须使用Styled-components预定义的语法糖，如`styled.div("...")`; 第二，也是我最接受不了的，它的语法糖对css的封装居然使用的是string，而使用string也就意味着我们将会失去一起可能对象化操作css的机会。这与差不多10年前 `AngularJS 1.x` 时代对 html 的处理方法如出一辙，不得不说这种方式似乎是在开历史的倒车。



    不过，Styled-components 应该是CSS-in-JS最热门的一个库了，到目前为止github的star数已经超过了30k了。通过styled-components，你可以使用ES6的标签模板字符串语法（Tagged Templates）为需要styled的Component定义一系列CSS属性，当该组件的JS代码被解析执行的时候，styled-components会动态生成一个CSS选择器，并把对应的CSS样式通过style标签的形式插入到head标签里面。动态生成的CSS选择器会有一小段哈希值来保证全局唯一性来避免样式发生冲突。[2]



    它既具备了 css-in-js 的模块化与参数化优点，又完全使用CSS的书写习惯，不会引起额外的学习成本[3]。



    但是，我希望同学们还是要辩证的看待Styled-components，不能因为我的的说法而对这个框架产生抗拒情况，还是要亲自感受一下才能得出结论。



### 2. 使用模块化css

    如课程所介绍

## JSS 的好处

### 1. 局部样式 - Scoping Styles

    CSS有一个被大家诟病的问题就是没有本地作用域，所有声明的样式都是全局的（global styles）。而CSS-in-JS会提供自动局部CSS作用域的功能，你为组件定义的样式会被限制在这个组件，而不会对其他组件的样式产生影响。[2]



### 2. 避免无用的CSS样式堆积

    进行过大型Web项目开发的同学应该都有经历过这个情景：在开发新的功能或者进行代码重构的时候，由于HTML代码和CSS样式之间没有显式的一一对应关系，我们很难辨认出项目中哪些CSS样式代码是有用的哪些是无用的，这就导致了我们不敢轻易删除代码中可能是无用的样式。这样随着时间的推移，项目中的CSS样式只会增加而不会减少(append-only stylesheets）。



    而因为CSS-in-JS会把样式和组件绑定在一起，当这个组件要被删除掉的时候，直接把这些代码删除掉就好了，不用担心删掉的样式代码会对项目的其他组件样式产生影响。而且由于CSS是写在JavaScript里面的，我们还可以利用JS显式的变量定义，模块引用等语言特性来追踪样式的使用情况，这大大方便了我们对样式代码的更改或者重构。[2]



### 3 Critical CSS

    放在head标签内的CSS当然是越少越好，因为太多的内容会加大html的体积，所以我们一般把用户需要在首屏看到的（above the fold）页面要用到的最少CSS提取为Critical CSS。

   



    CSS-in-JS通过增加一点加载的JS体积就可以避免另外发一次请求来获取其它的CSS文件。而且一些CSS-in-JS的实现（例如styled-components）对Critical CSS是自动支持的。[2]





### 4. 基于状态的样式定义

    CSS-in-JS可以根据组件的状态动态地生成样式。[2]



### 5. 封装得更好的组件库

    如果CSS是写在JS里面的，项目想要使用封装的组件库只需要进行简单的npm install就可以了，非常方便。[2]



<br />



## JSS 的坏处

### 1. 陡峭的学习曲线

    首先CSS-in-JS是针对component-based的框架的，这就意味着要学习CSS-in-JS你必须得学习：component-based框架（例如React），JavaScript和CSS这三样技能。其次，即使你已经会用React，JavaScript和CSS来构建SPA应用，你还要学习某个CSS-in-JS实现（例如styled-components），以及学习一种全新的基于组件定义样式的思考问题方式。[2]



### 2. 运行时消耗

    由于大多数的CSS-in-JS的库都是在动态生成CSS的, 这就意味着会有一定的性能代价[2]



### 3. 代码可读性差

    大多数CSS-in-JS实现会通过生成唯一的CSS选择器来达到CSS局部作用域的效果。这些自动生成的选择器会大大降低代码的可读性，给开发人员debug造成一定的影响。[2]



### 4. 没有统一的业界标准

    CSS-in-JS只是一种技术思路而没有一个社区统一遵循的标准和规范，所以不同实现的语法和功能可能有很大的差异。[2]



## 总结

CSS-in-JS有好处也有坏处，要不要使用完全取决于同学们自己的项目需求。例如在下面几种情况下你就不需要它:



1. 前端开发的初学者： 由于CSS-in-JS的学习坡度很陡，刚开始学习Web开发的同学没必要学习，可能会有挫败感。

2. 功能简单的静态页面：逻辑交互不复杂的网站没有必要使用CSS-in-JS。

3. 注重样式可读性以及调试体验： CSS-in-JS动态生成的选择器很影响代码的可读性，可能会降低你的调试效率。



#### 4.CSS 插件



```
npm install typescript-plugin-css-modules --save-dev 
```

图标插件

```
npm install react-icons
// 导入
import {FiShoppingCart} from "react-icons/fi"
```

 --save-dev ： 只参与开发，不参与项目打包上线

插件配置：

tsconfig里：在 `compilerOptions` 里：

```
"plugins": [{"name": "typescript-plugin-css-modules"}]
```

新增 .vscode 文件夹 → settings.json

```
{
	"typescript.tsdk": "node_modules/typescript/lib",
	"typescript.enablePromptUseWorkspaceTsdk": true
}
```

#### 5.加载图片和媒体资源

src 下新增静态资源存放文件夹 assets

fonts 文件在全局配置的话，需要在 index.css 文件中添加,

```css

@font-face {
  font-family: 'Slidefu';
  src: local('Slidefu'), url(./assets/fonts/Slidefu-Regular-2.ttf) format('truetype');
}
```

#### 6.行内样式

## 如何为组件添加 CSS 的 class？

传递一个字符串作为 className 属性：

```javascript

render() {

  return <span className="menu navigation-menu">Menu</span>

}

```



CSS 的 class 依赖组件的 props 或 state 的情况很常见：

```javascript

render() {

  let className = 'menu';

  if (this.props.isActive) {

    className += ' menu-active';

  }

  return <span className={className}>Menu</span>

}

```



## style(行内样式 inline-style) 规范



    注意



    在文档中，部分例子为了方便，直接使用了 style，但是通常不推荐将 style 属性作为设置元素样式的主要方式。在多数情况下，应使用 className 属性来引用外部 CSS 样式表中定义的 class。style 在 React 应用中多用于在渲染过程中添加动态计算的样式。另请参阅：FAQ：Styling 和 CSS。



`style` 接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串。这与 DOM 中 style 的 JavaScript 属性是一致的，同时会更高效的，且能预防跨站脚本（XSS）的安全漏洞。例如：



```javascript

const divStyle = {

  color: 'blue',

  backgroundImage: 'url(' + imgUrl + ')',

};



function HelloWorldComponent() {

  return <div style={divStyle}>Hello World!</div>;

}

```



注意：样式不会自动补齐前缀。如需支持旧版浏览器，请手动补充对应的样式属性：

```javascript

const divStyle = {

  WebkitTransition: 'all', // note the capital 'W' here

  msTransition: 'all' // 'ms' is the only lowercase vendor prefix

};



function ComponentWithTransition() {

  return <div style={divStyle}>This should work cross-browser</div>;

}

```



Style 中的 key 采用小驼峰命名是为了与 JS 访问 DOM 节点的属性保持一致（例如：node.style.backgroundImage ）。浏览器引擎前缀都应以大写字母开头，除了 ms。因此，WebkitTransition 首字母为 ”W”。



React 会自动添加 ”px” 后缀到内联样式为数字的属性后。如需使用 ”px” 以外的单位，请将此值设为数字与所需单位组成的字符串。例如：

```javascript

// Result style: '10px'

<div style={{ height: 10 }}>

  Hello World!

</div>



// Result style: '10%'

<div style={{ height: '10%' }}>

  Hello World!

</div>

```



但并非所有样式属性都转换为像素字符串。有些样式属性是没有单位的(例如 zoom，order，flex)。



## 行内样式不好吗？

    从性能角度来说，CSS 的 class 通常比行内样式更好。

#### 7.event

- event 可以用箭头函数或者 bind 不然 this 就指向方法本身而不是类本身，类本身的方法就无法访问

```
e.target  // 事件发生的元素
e.currentTarget // 事件处理绑定的元素
```

比如说 onclick 事件

```
        console.log(e.target); // 点击谁就是谁
		console.log(e.currentTarget);    // 绑定谁就是谁
```

如果要限定触发类型，可以拿到 `nodeName`

```JSX
if((e.target as HTMLElement).nodeName === "SPAN"){
            this.setState({
                isOpen: !this.state.isOpen
            })
}
```

