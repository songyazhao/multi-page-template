webpackJsonp([12],{

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(436);

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _mixins = __webpack_require__(23);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', _init);

function _init() {
  var statusOptions = document.querySelector('#order-status');
  statusOptions = JSON.parse(statusOptions.innerText);

  window.vm = new _vue2.default({
    el: '#global_layout',

    mixins: [_mixins2.default],

    data: {
      statusOptions: statusOptions, // 订单状态列表
      tableData: [], // 表格数据
      ajaxParams: {
        cityId: 0, // 所选城市
        status: '0', // 订单状态
        license_number: '', // 车牌号
        order_sn: '' // 订单号
      }
    },

    created: function created() {
      this.getOrderList();
    },


    watch: {
      ajaxParams: {
        deep: true,
        handler: function handler() {
          this.getOrderList();
        }
      }
    },

    methods: {
      changeOrderStatus: function changeOrderStatus(order_sn) {
        var _this = this;

        this.$http.post("/Caryu/CarInsurance/orderSuccess", { order_sn: order_sn }).then(function (res) {
          if (res.code === 0) {
            _this.Msg.success(res.msg || '修改成功');
          }
        });
      },
      getOrderList: function getOrderList() {
        var _this2 = this;

        this.$http.post("/Caryu/CarInsurance/orderList", this.ajaxParams).then(function (res) {
          if (res.code === 0) {
            _this2.tableData = res.data.data;
            _this2.total = res.data.total;
          }
        });
      },
      viewOrderDetail: function viewOrderDetail(_ref) {
        var order_sn = _ref.order_sn;

        this.f_addTab('WeChatCarInsuranceOrderDetail_' + order_sn, document.title, '/index.php/Caryu/CarInsurance/childOrder?order_sn=' + order_sn);
      }
    }
  });
}

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[435]);