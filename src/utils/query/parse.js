/**
 * JSON格式转URL参数格式
 * @param {String} baseUrl   基于此URL拼接(可选)
 * @param {Object} obj       需要转的JSON对象
 */
module.exports = function (baseUrl, obj) {
  if (typeof baseUrl === 'object') (obj = baseUrl, baseUrl = '')
  else baseUrl += '?'

  for (let k in obj) {
    baseUrl += k + '=' + obj[k] + "&"
  }
  return baseUrl.substr(0, baseUrl.length - 1);
}