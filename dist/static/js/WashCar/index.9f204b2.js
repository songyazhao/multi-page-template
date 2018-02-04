webpackJsonp([4],{

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(768);

var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

var _mixins = __webpack_require__(23);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* css */
document.addEventListener('DOMContentLoaded', _init);

function _init() {
  var Main = {
    mixins: [_mixins2.default],
    data: function data() {
      return {
        fullscreenLoading: true,
        total: '', // 数据总条数
        tableData: [], // 表格数据
        time_star: '',
        time_end: '',
        ajaxParams: {
          to_excel: 0, // 是否下载Exce
          time_star: '', // 开始时间
          time_end: '', // 结束时间
          device: '', // 设备名称
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
    methods: {
      tableRowClassName: function tableRowClassName(row) {
        if (row.status == -1) {
          return 'warning-row';
        } else if (row.status == 3) {
          return 'success-row';
        }
        return '';
      },
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
        this.$http.post("/Caryu/WashCar/orderList", ajaxParams).then(function (res) {
          setTimeout(function () {
            return _this.fullscreenLoading = false;
          }, 800);
          if (res.code == 0) {
            if (_this.ajaxParams.to_excel === 1) {
              location.href = res.data.replace('./Public', '/Public');
              _this.ajaxParams.to_excel = 0;
            } else {
              _this.tableData = res.data.list || [];
              _this.total = ~~res.data.total;
            }
          } else {
            _this.Msg.error(res.msg || res.info || '获取数据失败！');
          }
        });
      }
    }
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 768:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[767]);