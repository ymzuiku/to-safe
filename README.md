## JavaScript 之痛
```
var obj = {a:'bb'}

// 如果我们直接获取 obj.a.b.c, js会崩溃, 因为我们尝试获取一个 `undefined` 对象的子对象
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

## 自定一个tryGet方法

制定一个tryGet方法的好处是我们仅仅把获取对象的执行语句进行try, 并且使用起来更方便一些

```
function tryGet(obj) {
  try {
    return obj();
  } catch (error) {
    return undefined;
  }
}

// 如果是brower环境,就绑定在window里
// 如果是NodeJS环境,就绑定在global里
try {
  window['global'] = {};
} catch {}
global['tryGet'] = tryGet;
```

## 使用

```
var obj = { a: 'bb'};
var value = tryGet(()=>obj.a.b.c.d[2].e);
console.log(value);  // undefined
```
