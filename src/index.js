function toSafe(obj, undefinedKey = 'isNull', isUndefined, lastKey) {
  if (Object.prototype.toString.call(obj) === '[object Function]') {
    try {
      return obj();
    } catch (error) {
      return { [undefinedKey]: true };
    }
  }
  if (isUndefined) {
    obj = { [undefinedKey]: true };
  }
  return new Proxy(obj, {
    get: function(target, key) {
      var value = Reflect.get(target, key);
      if (
        value === undefined ||
        Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]' ||
        Object.prototype.toString.call(value) === '[object Function]'
      ) {
        return toSafe(target, undefinedKey, true, key);
      }
      return value;
    },
  });
}

console.time('default');
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
var data;
for (let i = 0; i < 5; i++) {
  data = data['sub' + i] = node;
}
console.log(data);
console.timeEnd('default');

module.exports = toSafe;
