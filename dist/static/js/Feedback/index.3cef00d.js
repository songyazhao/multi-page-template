webpackJsonp([9],{

/***/ 441:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(442);

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
        exportExcelDialogVisible: false, // 控制导出excel dialog显隐
        tableData: [], // 表格数据
        ajaxParams: {
          to_excel: 0,
          time_start: '',
          time_end: ''
        },
        exportListParams: { // 导出excel用到参数
          to_excel: 1,
          filter: '',
          time_start: '',
          time_end: ''
        }
      };
    },


    watch: {
      ajaxParams: {
        deep: true,
        handler: function handler() {
          this.getDataList();
        }
      }
    },

    created: function created() {
      this.getDataList();
    },


    methods: {
      handleSelectionChange: function handleSelectionChange(selection) {
        var query = this.exportListParams;
        if (selection.length > 0) {
          query.time_start = '';
          query.time_end = '';
          query.filter = selection.map(function (item) {
            return item.id;
          }).toString();
        } else {
          query.filter = '';
        }
      },
      exportExcelHandler: function exportExcelHandler() {
        if (this.exportListParams.filter === '') {
          this.exportExcelDialogVisible = true;
        } else {
          // 勾选数据的状态下直接导出
          this.exportList();
        }
      },
      exportExcelOkHandler: function exportExcelOkHandler(shortcut) {
        var params = { to_excel: 1 };
        if (shortcut !== -1) {
          // 快捷导出
          var end_day = new Date().toLocaleDateString().replace(/\//g, '-');
          var start_day = new Date(new Date() - shortcut * 24 * 60 * 60 * 1000).toLocaleDateString().replace(/\//g, '-');
          params.time_start = this.dateFormat(start_day + ' 00:00:00');
          params.time_end = this.dateFormat(end_day + ' 23:59:59');
          this.exportList(params);
        } else {
          var query = this.exportListParams;
          if (query.time_start === '') {
            return this.Msg.info('请选择开始时间！');
          }
          if (query.time_end === '') {
            return this.Msg.info('请选择结束时间！');
          }
          this.exportList();
        }
      },
      exportList: function exportList(params) {
        var query = this.exportListParams;
        this.$http.post("/Caryu/Feedback/feedbackList", params || query).then(function (res) {
          if (res.code === 0) {
            query.time_start = '';
            query.time_end = '';
            location.href = res.data.replace('./', '/');
          }
        });
      },
      getDataList: function getDataList() {
        var _this = this;

        this.$http.post("/Caryu/Feedback/feedbackList", this.ajaxParams).then(function (result) {
          if (result.code === 0) {
            _this.tableData = result.data.list || [];
            _this.total = result.data.total;
          }
        });
      }
    }
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 442:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[441]);