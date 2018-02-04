webpackJsonp([14],{

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /* css */


__webpack_require__(429);

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _mixins = __webpack_require__(23);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', _init);

function _init() {
  var options = document.querySelector('#red-packet');
  try {
    options = JSON.parse(options.innerText);
    options = JSON.parse(options.value);
    options = options.redPacket;
    // options = { money: options.money, name: options.name }
  } catch (error) {
    options = [{ "money": 5.99, "name": "一分洗车券" }, { "money": 3, "name": "3元代金券" }, { "money": 2, "name": "2元代金券" }];
    console.info(error);
  }

  var ConfigCouponItem = { number: 0, name: '', money: 0, error: '', options: options, selected: '' };
  var ConfigRechargeItem = { top_up: '', give: 0 };
  var Main = {
    mixins: [_mixins2.default],

    data: function data() {
      return {
        TimeCoupon: [],
        TimeRecharge: [],
        ConfigCoupon: [Object.assign({}, ConfigCouponItem)],
        ConfigRecharge: [Object.assign({}, ConfigRechargeItem)],
        DisabledCoupon: true,
        DisabledRecharge: true,
        PICKER_OPTIONS: {
          disabledDate: function disabledDate(time) {
            return false;
          },

          shortcuts: [{
            text: '30天',
            onClick: function onClick(picker) {
              var end = new Date();
              var start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '60天',
            onClick: function onClick(picker) {
              var end = new Date();
              var start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 60);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '90天',
            onClick: function onClick(picker) {
              var end = new Date();
              var start = new Date();
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateRules: [{ required: true, message: '起止日期不能为空', trigger: 'change' }]
      };
    },


    computed: {
      _ConfigCoupon: function _ConfigCoupon() {
        return this.ConfigCoupon.map(function (item) {
          var _item$selected = item.selected,
              money = _item$selected.money,
              name = _item$selected.name;

          return { money: money, name: name, number: item.number };
        });
      }
    },

    created: function created() {
      this.InitData();
    },


    methods: {
      ConfigCoupon__Add: function ConfigCoupon__Add() {
        this.ConfigCoupon.push(Object.assign({}, ConfigCouponItem));
      },
      ConfigCoupon__Remove: function ConfigCoupon__Remove(index) {
        this.ConfigCoupon.splice(index, 1);
      },
      ConfigCoupon__Ok: function ConfigCoupon__Ok(C) {
        var text = '优惠券类型不能为空';

        C.forEach(function (item) {
          return item.error = item.selected === '' ? text : '';
        });

        if (C.some(function (item) {
          return item.selected === '';
        })) return this.Msg.warning('请选择优惠券类型！');
        if (this.TimeCoupon.length === 0) return this.Msg.warning('请选择活动日期！');
        this.ConfigCoupon__Post();
      },
      ConfigCoupon__Post: function ConfigCoupon__Post() {
        var _this = this;

        var TimeCoupon = this.TimeCoupon,
            _ConfigCoupon = this._ConfigCoupon;

        var _TimeCoupon = _slicedToArray(TimeCoupon, 2),
            time_start = _TimeCoupon[0],
            time_end = _TimeCoupon[1];

        var info = JSON.stringify(_ConfigCoupon);
        var params = { time_start: time_start, time_end: time_end, info: info };
        this.$http.post('/Caryu/Activity/updateCoupon', params).then(function (result) {
          if (result.code === 0) {
            _this.Msg.success(result.msg || '保存成功！');
            _this.DisabledCoupon = true;
          } else {
            _this.Msg.error(result.msg || '保存失败！');
            _this.DisabledCoupon = false;
          }
        });
      },
      ConfigRecharge__Add: function ConfigRecharge__Add() {
        // this.$refs.FormRecharge.forEach(item => item.clearValidate())
        this.ConfigRecharge.push(Object.assign({}, ConfigRechargeItem));
      },
      ConfigRecharge__Remove: function ConfigRecharge__Remove(index) {
        this.ConfigRecharge.splice(index, 1);
      },
      ConfigRecharge__Ok: function ConfigRecharge__Ok(C) {
        if (this.TimeRecharge.length === 0) return this.Msg.warning('请选择活动日期！');
        this.ConfigRecharge__Post();
      },
      ConfigRecharge__Post: function ConfigRecharge__Post() {
        var _this2 = this;

        var TimeRecharge = this.TimeRecharge,
            ConfigRecharge = this.ConfigRecharge;

        var _TimeRecharge = _slicedToArray(TimeRecharge, 2),
            time_start = _TimeRecharge[0],
            time_end = _TimeRecharge[1];

        var info = JSON.stringify(ConfigRecharge);
        var params = { time_start: time_start, time_end: time_end, info: info };
        this.$http.post('/Caryu/Activity/updateTopUpGive', params).then(function (result) {
          if (result.code === 0) {
            _this2.Msg.success(result.msg || '保存成功！');
            _this2.DisabledRecharge = true;
          } else {
            _this2.Msg.error(result.msg || '保存失败！');
            _this2.DisabledRecharge = false;
          }
        });
      },
      InitData: function InitData() {
        var _this3 = this;

        this.$http.get("/Caryu/Activity/activityList").then(function (result) {
          var data = result.data;
          if (result.code === 0 && data) {
            if (data.new_washer && data.new_washer.length > 0) {
              data.new_washer.forEach(function (item, index) {
                item.selected = { money: parseFloat(item.money), name: item.name };
                item.error = '';
                item.options = options;
              });
              _this3.ConfigCoupon = data.new_washer;

              var _data$new_washer$ = data.new_washer[0],
                  time_start = _data$new_washer$.time_start,
                  time_end = _data$new_washer$.time_end;

              _this3.TimeCoupon = [time_start, time_end];
            }

            if (data.top_up_give && data.top_up_give.length > 0) {
              _this3.ConfigRecharge = data.top_up_give;

              var _data$top_up_give$ = data.top_up_give[0],
                  _time_start = _data$top_up_give$.time_start,
                  _time_end = _data$top_up_give$.time_end;

              _this3.TimeRecharge = [_time_start, _time_end];
            }
          }
        });
      }
    }
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 429:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[428]);