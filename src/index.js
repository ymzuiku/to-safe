function toSafe(obj, undefinedKey = 'isNull', isUndefined) {
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
  if (!Proxy) {
    console.error(
      '[error] to-safe: Your brower no have Proxy feature, Please use Function param',
    );
    throw '[error] to-safe: Your brower no have Proxy feature, Please use Function param';
  }
  return new Proxy(obj, {
    get: function(target, key) {
      var value = Reflect.get(target, key);
      if (
        value === undefined ||
        (Object.prototype.toString.call(value) !== '[object Object]' &&
          Object.prototype.toString.call(value) !== '[object Array]' &&
          Object.prototype.toString.call(value) !== '[object Function]')
      ) {
        return toSafe(target, undefinedKey, true);
      }
      return value;
    },
  });
}

module.exports = toSafe;
