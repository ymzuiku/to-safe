# to-safe

> This package use Proxy in ES6, this feature is can't babel\polyfill to ES5, Please  Think twice!

## Install

```
$ npm install --save to-safe
```

## Painful in Javascript
```
var obj = {a:'bb'}
var value;

// if you get obj.a.b[2].c, is Error
if(obj.a && obj.a.b && obj.a.b[2] && obj.a.b[2].c) {
  value = obj.a.b[2].c;
}

```

## Case1: Change SafeObj

```
import toSafe from 'to-safe'
var obj = { a: 'bb'};
obj = toSafe(obj);
d = obj.a.b.c.d;  // {isNull: true}
console.log(d.e[2].g[0].f);  // {isNull: true}

```

## Case2: Use function callbak

```
import toSafe from 'to-safe'
var obj = { a: 'bb'};
var value = toSafe(()=>obj.a.b.c.d[2].e);
console.log(value);  // {isNull: true}
```

## Set isNull Key

```
import toSafe from 'to-safe'
var obj = { a: 'bb'};
obj = toSafe(obj, 'empty');
console.log(obj.a.b.c.d);  // {empty: true}
```
