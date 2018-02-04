webpackJsonp([13],{

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

__webpack_require__(431);

var _mixins = __webpack_require__(23);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', _init);

var statusOptions = [];

function _init() {

  try {
    statusOptions = document.querySelector('#status-list');
    statusOptions = JSON.parse(statusOptions.innerText);
  } catch (e) {
    statusOptions = [];
    console.info(e);
  }

  var Main = {
    mixins: [_mixins2.default],

    data: function data() {
      return {
        statusOptions: statusOptions,
        dialogVisible: false,
        tableData: [], // 表格数据
        logTableData: [], // 状态日志
        ajaxParams: {
          city_id: 0,
          status: 0,
          mobile: '',
          time_star: '', // 开始时间
          time_end: '' // 结束时间
        }
      };
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

    filters: {
      formatStatus: function formatStatus(status) {
        if (!status) return '';
        var temp = statusOptions.filter(function (item) {
          return item.id == status;
        });
        return temp[0].name;
      }
    },

    methods: {
      handleViewLog: function handleViewLog(_ref) {
        var _this = this;

        var orderid = _ref.orderid;

        this.$http.get('/Caryu/CarGuaranty/getLog?orderid=' + orderid).then(function (res) {
          if (res.code === 0) {
            _this.logTableData = res.data || [];
            _this.dialogVisible = true;
          }
        });
      },
      getOrderList: function getOrderList() {
        var _this2 = this;

        var ajaxParams = Object.assign({}, this.ajaxParams);
        if (ajaxParams.time_end == '') ajaxParams.time_star = '';
        this.$http.post('/Caryu/CarGuaranty/getlist', ajaxParams).then(function (res) {
          _this2.tableData = res.rows || [];
          _this2.total = res.total;
        });
      }
    }
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 431:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[430]);