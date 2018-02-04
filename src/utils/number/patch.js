/**
 * 指定数字前置补0
 * @param {Number} num 要进行补0的数字
 * @param {Number} n   包括补充的0在内的总位数
 */
module.exports = function (num, n) {
  return (Array(n).join(0) + ~~num).slice(-n)
}