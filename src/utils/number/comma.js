module.exports = function (source, length = 3) {
  source = String(source).split(".");
  source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
  source[1] = source.length === 1 ? '00' : source[1].length === 1 ? `${source[1]}0` : source[1]
  return source.join(".");
}