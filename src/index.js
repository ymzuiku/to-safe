function toSafe(obj, nullKey = 'isNull', valueType, lastKey) {
  if (valueType !== 'object' && valueType !== undefined) {
    obj = { [lastKey]: obj[lastKey], [nullKey]: true };
  } else if (valueType === 'object') {
    obj = obj[lastKey];
  }
  return new Proxy(obj, {
    get: function(target, key) {
      var value = Reflect.get(target, key);
      var typeCall = Object.prototype.toString.call(value);
      if (value === undefined) {
        return toSafe(target, nullKey, 'empty', key);
      } else if (
        typeCall === '[object Object]' ||
        typeCall === '[object Array]'
      ) {
        return toSafe(target, nullKey, 'object', key);
      } else if (
        valueType === undefined ||
        valueType === 'empty' ||
        value === 'object'
      ) {
        return toSafe(target, nullKey, 'first', key);
      } else if (valueType === 'first') {
        return toSafe(target, nullKey, 'end', key);
      } else if (valueType === 'end') {
        return toSafe(target, nullKey, 'end2', key);
      }
      return value;
    },
  });
}

function tryGet(obj) {
  try {
    return obj();
  } catch (error) {
    return undefined;
  }
}

toSafe.try = tryGet;

try {
  window['global'] = {};
} catch {}

global['toSafe'] = toSafe;
global['tryGet'] = tryGet;

module.exports = toSafe;
