webpackJsonp([11],{

/***/ 437:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

__webpack_require__(438);

var _mixins = __webpack_require__(23);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', _init);

var statusOptions = [{ value: 4, label: '全部' }, { value: 0, label: '已提交' }, { value: 1, label: '办理中' }, { value: 2, label: '已完成' }, { value: -1, label: '已失效' }, { value: 3, label: '已退款' }];

function _init() {
  var Main = {
    mixins: [_mixins2.default],
    data: function data() {
      return {
        fullscreenLoading: true,
        statusOptions: statusOptions,
        total: '', // 数据总条数
        tableData: [], // 表格数据
        time_star: '',
        time_end: '',
        ajaxParams: {
          city_id: 0,
          orderStatus: 4,
          license_number: '',
          time_star: '', // 开始时间
          time_end: '', // 结束时间
          page: 1,
          rows: 20,
          currentPage: 1
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
          return item.value == status;
        });
        return temp[0].label;
      }
    },
    methods: {
      handleSizeChange: function handleSizeChange(rows) {
        this.ajaxParams.rows = rows;
      },
      handleCurrentChange: function handleCurrentChange(page) {
        this.ajaxParams.currentPage = this.ajaxParams.page = page;
      },
      getOrderList: function getOrderList() {
        var _this = this;

        var ajaxParams = Object.assign({}, this.ajaxParams);
        if (ajaxParams.time_end == '') ajaxParams.time_star = '';
        this.$http.post("/Caryu/CarViolation/getList", ajaxParams).then(function (res) {
          setTimeout(function () {
            return _this.fullscreenLoading = false;
          }, 800);
          _this.tableData = res.rows || [];
          _this.total = res.total;
        });
      }
    }
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 438:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[437]);