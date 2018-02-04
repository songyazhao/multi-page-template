/**
 * 正则验证
 * @param {Object} name
 * @param {Object} value
 */
function RegMatch(name, value) {
  switch (name) {
    case 'name': return value.match(/^[\u4e00-\u9fa5_a-zA-Z]{0,10}$/g)
    case 'tel': return value.match(/^(1[0-9])\d{9}$/g)
    case 'email': return value.match(new RegExp('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}', 'g'))
    case 'price': return value.match(/(^(\d{0,5})\.\d{0,2}$)|(^\d{0,5}$)/g)
    case 'km': return value.match(/(^(\d{0,3})\.\d{0,2}$)|(^\d{0,3}$)/g) && value <= 100
    case 'license_number': return value.match(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/)
  }
}

function isEmptyObject(obj) {
  for (var key in obj) {
    return false
  };
  return true
}

/**
 * 字符串指定位置进行脱敏
 * @param {String} str         要进行处理的字符串
 * @param {String} replaceStr  替换成该字符串
 * @param {Array}  pos         起始位置[start, end]
 */
function ReplacePos(str, replaceStr, pos) {
  if (str === '') return str
  return str.substr(0, pos[0] - 1) + replaceStr + str.substr(pos[1])
}

module.exports = {
  RegMatch,
  isEmptyObject,
  ReplacePos
}
