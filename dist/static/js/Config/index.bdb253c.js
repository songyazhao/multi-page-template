webpackJsonp([10],{

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(18);

var _vue2 = _interopRequireDefault(_vue);

__webpack_require__(440);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener('DOMContentLoaded', _init);

function _init() {
  var _methods;

  var Main = {
    data: function data() {
      return {
        fullscreenLoading: true,
        dialogFormVisible: false,
        total: '', // 数据总条数
        tableData: [], // 表格数据
        currentRow: {},
        method: 'addConfig',
        editRow: {
          key: '',
          value: '',
          explain: ''
        },
        ajaxParams: {
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

    methods: (_methods = {
      handleSizeChange: function handleSizeChange(rows) {
        this.ajaxParams.rows = rows;
      },
      handleCurrentChange: function handleCurrentChange(page) {
        this.ajaxParams.currentPage = this.ajaxParams.page = page;
      }
    }, _defineProperty(_methods, 'handleCurrentChange', function handleCurrentChange(newRow, oldRow) {
      this.currentRow = newRow;
    }), _defineProperty(_methods, 'saveConfig', function saveConfig(editRow) {
      var _this = this;

      if (!editRow.explain) return this.Msg.info('请输入权限名称！');
      if (!editRow.key) return this.Msg.info('请输入Key！');
      if (!editRow.value) return this.Msg.info('请输入Value！');
      this.$http.post('/Caryu/Config/' + this.method, editRow).then(function (res) {
        setTimeout(function () {
          return _this.fullscreenLoading = false;
        }, 800);
        if (res.code === 0) {
          _this.Msg.success(res.msg || '保存成功！');
          _this.dialogFormVisible = false;
          _this.getOrderList();
        }
      });
    }), _defineProperty(_methods, 'editConfig', function editConfig() {
      var isEmptyObject = function isEmptyObject(e) {
        var t = void 0;
        for (t in e) {
          return !1;
        }return !0;
      };

      if (isEmptyObject(this.currentRow)) return this.Msg.info('请选择一条配置');
      this.method = 'updateConfig';
      this.editRow = JSON.parse(JSON.stringify(this.currentRow));
      this.dialogFormVisible = true;
    }), _defineProperty(_methods, 'getOrderList', function getOrderList() {
      var _this2 = this;

      this.$http.post("/Caryu/Config/getConfigList", this.ajaxParams).then(function (res) {
        setTimeout(function () {
          return _this2.fullscreenLoading = false;
        }, 800);
        if (res.code === 0) {
          res.data.list.forEach(function (item) {
            if (typeof item.value === 'string') try {
              item.value = JSON.stringify(JSON.parse(item.value));
            } catch (error) {
              console.info(error);
            }
          });
          _this2.tableData = res.data.list || [];
          _this2.total = res.data.total;
        }
      });
    }), _methods)
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 440:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[439]);