webpackJsonp([3],{

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(770);

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
        dialogVisible: false,
        dialogTitle: '添加设备',
        total: '', // 数据总条数
        tableData: [], // 表格数据
        time_start: '',
        time_end: '',
        ajaxParams: {
          city: 0,
          device: '',
          time_start: '',
          time_end: '',
          page: 1,
          rows: 20,
          currentPage: 1
        },
        currentRow: {},
        washDeviceDisabled: false,
        editRow: {
          shop_name: '',
          washDevice: '',
          address: '',
          city: ''
        }
      };
    },
    created: function created() {
      this.getDataList();
    },

    watch: {
      ajaxParams: {
        deep: true,
        handler: function handler() {
          this.getDataList();
        }
      }
    },
    filters: {
      formatStatus: function formatStatus(val) {
        switch (~~val) {
          case 0:
            return '故障';
          case 1:
            return '正常';
          default:
            return '--';
        }
      }
    },
    methods: {
      handleSizeChange: function handleSizeChange(rows) {
        this.ajaxParams.rows = rows;
      },
      handleCurrentChange: function handleCurrentChange(page) {
        this.ajaxParams.currentPage = this.ajaxParams.page = page;
      },
      editDeviceHandler: function editDeviceHandler() {
        var isEmptyObject = function isEmptyObject(e) {
          var t = void 0;
          for (t in e) {
            return !1;
          }return !0;
        };

        if (isEmptyObject(this.currentRow)) return this.Msg.info('请选择一个设备！');
        this.dialogTitle = '修改设备';
        var _currentRow = this.currentRow,
            shop_name = _currentRow.shop_name,
            washCar_device = _currentRow.washCar_device,
            address = _currentRow.address,
            city = _currentRow.city;

        this.editRow = { shop_name: shop_name, washDevice: washCar_device, address: address, city: ~~city };
        this.washDeviceDisabled = true;
        this.dialogVisible = true;
      },
      saveDeviceHandler: function saveDeviceHandler(editRow) {
        if (!editRow.shop_name) return this.Msg.info('请填写门店名称！');
        if (!editRow.city) return this.Msg.info('请选择城市！');
        if (!editRow.address) return this.Msg.info('请填写地址！');
        if (!editRow.washDevice) return this.Msg.info('请填写设备序列号！');
        if (this.dialogTitle === '修改设备') {
          this.saveDevice('updateDevice');
        } else {
          this.saveDevice('addDevice');
        }
      },
      saveDevice: function saveDevice(api) {
        var _this = this;

        this.$http.post('/Caryu/WashDevice/' + api, this.editRow).then(function (res) {
          if (res.code === 0) {
            _this.dialogVisible = false;
            _this.Msg.success(res.msg || '保存成功');
            _this.getDataList();
          }
        });
      },
      getDataList: function getDataList() {
        var _this2 = this;

        var ajaxParams = Object.assign({}, this.ajaxParams);
        if (ajaxParams.time_end == '') ajaxParams.time_start = '';
        this.$http.post("/Caryu/WashDevice/washDeviceList", this.ajaxParams).then(function (res) {
          _this2.tableData = res.list || [];
          _this2.total = res.total;
        });
      }
    }
  };

  var Ctor = _vue2.default.extend(Main);
  window.vm = new Ctor().$mount('#global_layout');
}

/***/ }),

/***/ 770:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[769]);