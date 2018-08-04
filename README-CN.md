# 在 JavaScript 中安全的读取子对象

# [English Document](README.md)

## JavaScript 之痛
```
var obj = {a:'bb'}

// 如果我们直接获取 obj.a.b.c, js会崩溃, 因为没有该对象
// 当我们不确定对象是否有子属性时, 得逐步判断, 或者放进 try-catch 中

if(obj.a && obj.a.b && obj.a.b[2] && obj.a.b[2].c) {
  console.log(obj.a.b[2].c);
}

// or 
// 注意 try-catch 会有较大的性能损失
// 所以尽量只包裹真正需要try的执行语句

try {
  console.log(obj.a.b[2].c);
} catch(error) {
  console.warn('oh No!!')
}

```

# 这会给我们造成非常多的麻烦

### 现在我们使用 to-safe 解决以上问题


## 安装

to-safe 这个库使用了ES6中的Proxy特性, 该特性无法 babel\polyfill 至ES5或ES3, 并且IE10或以下均不支持该特性,使用前请确定好浏览器场景

```
$ npm install --save to-safe
```

## 变为安全的对象

```
var toSafe = require('to-safe')

var obj = { a: 'bb' };

// 我们把obj对象转化成安全的对象
obj = toSafe(obj);

// 直接取它的子子子对象,甚至是不存在的数组, 我们并不会崩溃, 而是得到一个 {isNull: true} 对象
console.log(obj.e[2].g[0].f); // 取一个不存在的值时, 返回 {isNull: true}

// 这个对象一旦被转成了安全对象, 它的子对象也会是安全对象, 即便它被重新赋值
var dog = obj.x.y[5].z;

// dog.o 已被重新赋值
dog.o = 20; 

// 取一个不存在的值时
console.log(dog.o.p[20].e);  // 返回 {isNull: true}

// 还是能正确的取到
console.log(dog.o);  // 返回 20

```

看上去很神奇, 其实原理很简单: toSafe 把对象的子属性进行递归, 重写了get方法. 当我们取出新的子属性时, 又会把子子属性进行递归,重写get方法, 这样规避了JS的崩溃

## 使用函数安全获取

如果要兼容低版本浏览器, 就无法使用Proxy特性, 
此时使用函数读取,`toSafe`会用`try-catch`包裹该函数

```
var toSafe = require('to-safe')

var obj = { a: 'bb'};
var value = toSafe(()=>obj.a.b.c.d[2].e);
console.log(value);  // {isNull: true}
```

## 修改判断对象的参数名

```
var toSafe = require('to-safe')

var obj = { a: 'bb'};
obj = toSafe(obj, 'empty');
// 默认的 {isNll: true} 变成了 {empty: true}
console.log(obj.a.b.c.d);  // {empty: true}
```

## 仓库地址

[https://github.com/ymzuiku/to-safe](https://github.com/ymzuiku/to-safe)