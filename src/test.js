require('./index');

var node = {
  foo: {
    name: 'foo',
    age: 20,
    data: [
      299,
      'bbb',
      13,
      {
        subName: 'subName',
        subAge: 15,
      },
    ],
  },
  dog: [
    299,
    'bbb',
    13,
    {
      subName: 'subName',
      subAge: 15,
    },
  ],
  cat: 'aaaa',
};

var data = {};
for (let i = 0; i < 200000; i++) {
  data['sub' + i] = node;
}

console.time('default');
var end0 = 0;
for (let i = 0; i < 100000; i++) {
  end0 += data.sub200.foo.data[2];
}
console.log(end0);
console.timeEnd('default');

console.time('try');
var end1 = 0
for (let i = 0; i < 100000; i++) {
  end1 += tryGet(() => data.sub200.foo.data[2]);
}
console.log(end1);
console.timeEnd('try');

data = toSafe(node);
console.log(data.foo.data);
console.log(data.foo.data[2]);
console.log(data.foo.data[2].o);
console.log(data.foo.data[2].o.b);
// console.log(data.sub400.dog[2].b.c);
