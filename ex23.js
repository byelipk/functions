function mapObj(mapperFn, o) {
  var obj = {};
  var keys = Object.keys(o);
  for (let key of keys) {
    obj[key] = mapperFn(o[key]);
  }
  return obj;
}

var obj = {
  hello: "world"
};

var newObj = mapObj(function mapper(val) {
  return val.toUpperCase();
}, obj);

console.log(newObj);