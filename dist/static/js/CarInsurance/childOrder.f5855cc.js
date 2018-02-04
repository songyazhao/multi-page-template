webpackJsonp([2],{

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(433);

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _const = __webpack_require__(434);

var _const2 = _interopRequireDefault(_const);

var _mixins = __webpack_require__(23);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var order_sn = __webpack_require__(91).queryString.parse().order_sn;
var typeArr = ['身份证号', '组织机构代码证', '护照', '军官证', '港澳回乡证或台胞证', '其他证件号'];

document.addEventListener('DOMContentLoaded', _init);

function _init() {
  window.vm = new _vue2.default({
    el: '#global_layout',

    mixins: [_mixins2.default],

    data: {
      order_sn: order_sn,
      orderStatus: '', // 订单的状态 -1关闭 -2失效
      carInfo: [], // 车辆信息
      insurance_info: [], // 险种原始信息
      insuranceCompany: [], // 保险公司
      insuranceList: [], // 处理后的险种信息(用来数据绑定)
      dialogTableVisible: false, // 报价记录的dialog
      gridData: [], // 报价记录dialog的表格数据
      supplementInfoModel: [false, false, false, false, false], // 补充信息 五个模块的勾选状态
      insurance_applicant: { // 投保人/受益人 信息
        insured_eq_applicant: 1, // 投保人受益人是否一致 1一致 0不一致
        applicant: '', // 投保人名字
        insured: '', // 受益人名字
        applicant_phone: '', // 投保人手机号
        insured_phone: '', // 受益人手机号
        applicant_Idcard: '', // 投保人证件号
        insured_Idcard: '', // 受益人证件号
        applicant_Idtype: 1, // 投保人证件类型 1：身份证 2: 组织机构代码证 3：护照 4：军官证 5：港澳回乡证或台胞证 6：其他
        insured_Idtype: 1 // 受益人证件类型
      },
      insurance_pic: { //投保人身份证照片(base64)
        applicant_zheng: '',
        applicant_fan: ''
      },
      driver_pic: { //驾驶证照片(base64)
        driver_zheng: '',
        driver_fan: ''
      },
      post_info: { // 邮寄信息
        receiver: '', // 收件人
        tel: '', // 收件人手机号
        receiver_address: '', // 收件人地址
        email: '' // 收件人邮箱
      }
    },

    computed: {
      isSame: function isSame() {
        // 投保/受益人是否一致
        return this.insurance_applicant.insured_eq_applicant == 1;
      },
      supplementInfo: function supplementInfo() {
        // 人工核实信息时 需要发送客户补充信息的模块
        return this.supplementInfoModel.map(function (v, i) {
          return v ? i + 1 : '';
        }).filter(function (v) {
          return v;
        }).join(',');
      },
      IdtypeLabel: function IdtypeLabel() {
        return typeArr[this.insurance_applicant.insured_Idtype - 1];
      }
    },
    created: function created() {
      this.getOrderList();
    },


    watch: {
      insurance_info: function insurance_info(val) {
        var _this = this;

        var temp = this.formatInsuranceList(val);
        temp.forEach(function (v, i) {
          if (v.isChangeStatus === true) temp[i] = _this.insuranceList[i];
        });
        this.insuranceList = temp;
      },


      insuranceList: { // 实时更新修改后的险种 用于修改完险种后 传送给后台
        deep: true,
        handler: function handler(val) {
          var _this2 = this;

          this.insurance_info.forEach(function (v, i) {
            v.total_amount = val[i].price[0].total_amount;
            v.pay_amount = val[i].price[0].pay_amount;
            v.payAmount = val[i].price[0].payAmount;
            v.profit = val[i].price[0].profit = _this2.updateProfit(v.payAmount, v.pay_amount);

            val[i].insurance.forEach(function (item, index, self) {
              item.BaoE_label = item.options && item.options[item.BaoE];
              v.plan.BizTotal = self.map(function (v) {
                return v.key !== 'ForceTax' && parseFloat(_this2.formatNumber(v.price));
              }).reduce(function (prev, next) {
                return prev + next;
              }); // 商业险总额 计算好 传给后台
              v.plan[item.key].BaoE = _this2.formatNumber(item.BaoE);
              v.plan[item.key].BaoFei = _this2.formatNumber(item.price);

              if (item.hasBuJiMian) v.plan['BuJiMian' + item.key].BaoE = ~~item.hasSDEW;
            });
          });
        }
      }
    },

    methods: {
      hasBuJiMian: function hasBuJiMian(key) {
        return !key.match(/ForceTax|BoLi|HcSanFangTeYue/);
      },

      hasBaoE: function hasBaoE(key) {
        return key.match(/BoLi|HuaHen|SanZhe|SiJi|ChengKe/);
      },

      formatNumber: function formatNumber(num) {
        return num === '' ? 0 : num;
      },

      updateProfit: function updateProfit(val1, val2) {
        return Math.round((val1 - val2) * 100) / 100;
      }, //计算盈利价格 折扣价 - 成本价

      renderHeader: function renderHeader(createElement, _ref) {
        var column = _ref.column,
            $index = _ref.$index;

        var price = column.label.split('&');
        return createElement('ul', [createElement('li', '保单价：¥' + price[0]), createElement('li', '折扣价：¥' + price[1])]);
      },
      qouteRecord: function qouteRecord() {
        var _this3 = this;

        // 报价记录
        this.$http.post("/Caryu/CarInsurance/getOfferLog", { order_sn: order_sn }).then(function (res) {
          if (!res.data || res.data.length === 0) _this3.Msg.error('暂无报价记录！');else if (res.code == 0) {
            _this3.dialogTableVisible = true;
            _this3.gridData = _this3.formatInsuranceList(res.data);
          } else _this3.Msg.error(res.msg || res.info || '操作失败！');
        });
      },
      getOrderList: function getOrderList() {
        var _this4 = this;

        this.$http.post("/Caryu/CarInsurance/getChildOrder", { order_sn: order_sn }).then(function (res) {
          if (res.code == 0) {
            var info = res.data.insurance_info;
            var supplementInfo = res.data.SupplementInfo;
            _this4.carInfo = [res.data.carInfo];
            _this4.orderStatus = res.data.carInfo.status;
            _this4.insuranceCompany = info.map(function (v) {
              return v.InsuranceCompany_code;
            });
            _this4.insurance_info = info.map(function (v) {
              return v.insurance = typeof v.insurance === 'string' ? JSON.parse(v.insurance.replace(/\&quto\;+/g, '')) : v.insurance, v.plan = v.insurance, v;
            });
            _this4.insurance_applicant = supplementInfo.insurance_applicant;
            _this4.insurance_pic = supplementInfo.insurance_pic;
            _this4.driver_pic = supplementInfo.driver_pic;
            _this4.post_info = supplementInfo.post_info;

            setTimeout(function () {
              return _this4.fullscreenLoading = false;
            }, 800);
          } else _this4.Msg.error(res.msg || res.info || '获取数据失败！');
        });
      },
      formatInsuranceList: function formatInsuranceList(val) {
        var _this5 = this;

        // 从后台接收到的险种信息 额外处理一下 方便界面的渲染及后续操作
        return val.map(function (temp, index) {
          var amp = {
            insurance: [],
            price: [{
              total_amount: temp.total_amount === '0.00' ? '' : temp.total_amount, // 保单价
              payAmount: temp.payAmount === '0.00' ? '' : temp.payAmount, // 折扣价
              pay_amount: temp.pay_amount === '0.00' ? '' : temp.pay_amount, // 成本价
              profit: 0 // 盈利
            }],
            code: temp.InsuranceCompany_code, // 保险公司代号
            name: temp.InsuranceCompany, // 保险公司名字
            isEdit: false, // 是否处于可编辑状态
            isChangeStatus: temp.isChangeStatus
          };

          temp = typeof temp.insurance === 'string' ? JSON.parse(temp.insurance.replace(/\&quto\;+/g, '')) : temp.insurance;
          for (var key in temp) {
            if (temp.hasOwnProperty(key) && key.indexOf('BuJiMian') === -1 && temp[key]['BaoE'] > 0) {
              var BaoE = temp[key].BaoE;
              var hasBuJiMian = _this5.hasBuJiMian(key);
              var hasBaoE = _this5.hasBaoE(key);

              var BaoE_label = hasBaoE && _const2.default[key];
              for (var k in BaoE_label) {
                if (BaoE_label.hasOwnProperty(k) && BaoE_label[k] === _const2.default[key][BaoE]) BaoE_label = _const2.default[key][BaoE];
              }amp.insurance.push({
                index: index,
                key: key,
                isChecked: true, // 是否勾选该险种 修改险种状态下有效
                name: _const2.default.insuranceName[key], // 保险名称
                hasBuJiMian: hasBuJiMian, // 是否有不计免赔的选项
                hasSDEW: hasBuJiMian && temp['BuJiMian' + key].BaoE > 0, // 是否不计免赔
                BaoE: BaoE, // 保价默认选项(代号)
                BaoE_label: BaoE_label, // 保价默认选项(文字)
                hasBaoE: hasBaoE, // 是否有保价的options
                options: hasBaoE && _const2.default[key], // 保价可选值
                price: temp[key].BaoFei || '' // 价格
              });
            }
          }return amp;
        });
      }
    }
  });
}

/***/ }),

/***/ 433:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  insuranceName: {
    // biz: '商业险',
    ForceTax: '交强险+车船税',
    BoLi: '玻璃险',
    CheSun: '车辆损失险',
    ZiRan: '自燃损失险',
    SheShui: '涉水险',
    HuaHen: '车身划痕险',
    HcSanFangTeYue: '机动车无法找到第三方特约险',
    DaoQiang: '全车盗抢险',
    SanZhe: '第三者责任险',
    SiJi: '司机责任险',
    ChengKe: '车上乘客险'
  },
  BoLi: {
    '1': '国产',
    '2': '进口'
  },
  HuaHen: {
    '2000': '2千',
    '5000': '5千',
    '10000': '1万',
    '20000': '2万'
  },
  SanZhe: {
    '50000': '5万',
    '100000': '10万',
    '150000': '15万',
    '200000': '20万',
    '300000': '30万',
    '500000': '50万',
    '1000000': '100万',
    '1500000': '150万'
  },
  SiJi: {
    '10000': '1万',
    '20000': '2万',
    '30000': '3万',
    '40000': '4万',
    '50000': '5万',
    '100000': '10万',
    '200000': '20万'
  },
  ChengKe: {
    '10000': '1万',
    '20000': '2万',
    '30000': '3万',
    '40000': '4万',
    '50000': '5万',
    '100000': '10万',
    '200000': '20万'
  }
};

/***/ })

},[432]);