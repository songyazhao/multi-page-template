webpackJsonp([1],{

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (true) {
		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(58)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));


/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(758);

var _jquery = __webpack_require__(58);

var _jquery2 = _interopRequireDefault(_jquery);

__webpack_require__(162);

var _http = __webpack_require__(131);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _jquery2.default)(document).ready(function () {
  var containerMtop = -(0, _jquery2.default)('#container').height() / 2 + 'px';
  var containerMleft = -(0, _jquery2.default)('#container').width() / 2 + 'px';
  (0, _jquery2.default)('#container').css({ // 位置计算
    marginTop: containerMtop,
    marginLeft: containerMleft
  });

  if (_jquery2.default.cookie("rmbUser") == "true") {
    (0, _jquery2.default)("#rememb").addClass("checked");
    (0, _jquery2.default)('input[name=username]').val(_jquery2.default.cookie("username"));
    (0, _jquery2.default)('input[name=password]').val(_jquery2.default.cookie("password"));
  }

  (0, _jquery2.default)('[name="username"]').focus();
  aniEndClearClassName(document.querySelector('ul'));
});

(0, _jquery2.default)(document).ready(function () {
  (0, _jquery2.default)(document).on('keydown', function (e) {
    if (e.keyCode == 13) (0, _jquery2.default)('.form__button').click();
  });

  (0, _jquery2.default)('#rememb').on('click', function () {
    (0, _jquery2.default)(this).toggleClass('checked');
  });

  (0, _jquery2.default)('.form__button').on('click', function () {
    var username = (0, _jquery2.default)('input[name=username]').val();
    var password = (0, _jquery2.default)('input[name=password]').val();

    if (username == '') {
      (0, _jquery2.default)('ul').addClass('animated shake');
      (0, _jquery2.default)('input[name=username]').parent().attr('alt', '用户名不能为空');
      return false;
    } else {
      (0, _jquery2.default)('input[name=username]').parent().attr('alt', '');
    }
    if (password == '') {
      (0, _jquery2.default)('ul').addClass('animated shake');
      (0, _jquery2.default)('input[name=password]').parent().attr('alt', '密码不能为空');
      return false;
    } else {
      (0, _jquery2.default)('input[name=password]').parent().attr('alt', '');
    }

    _http.$http.post('/Caryu/Index/login?dosubmit=1', { username: username, password: password }).then(function (res) {
      if (res.status == 0) {
        //登录成功
        (0, _jquery2.default)('li').attr('alt', '');

        //记住用户名密码
        if ((0, _jquery2.default)("#rememb").hasClass("checked")) {
          _jquery2.default.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
          _jquery2.default.cookie("username", username, { expires: 7 });
          _jquery2.default.cookie("password", password, { expires: 7 });
        } else {
          _jquery2.default.cookie("rmbUser", "false", { expire: -1 });
          _jquery2.default.cookie("username", "", { expires: -1 });
          _jquery2.default.cookie("password", "", { expires: -1 });
        }

        location.href = res.url;
      } else if (res.status == 1) {
        //用户名错误
        (0, _jquery2.default)('ul').addClass('animated shake');
        (0, _jquery2.default)('input[name=username]').parent().attr('alt', res.info);
      } else if (res.status == 2) {
        //密码错误
        (0, _jquery2.default)('ul').addClass('animated shake');
        (0, _jquery2.default)('input[name=password]').parent().attr('alt', res.info);
      } else if (res.status == 999) {
        //维护
        alert('系统正在升级维护');
        return false;
      } else {
        alert('登录失败,请联系管理员');
      }
    });
  });
});

function aniEndClearClassName(el) {
  var animationEvent = whichAnimationEvent();
  /* 监听变换事件! */
  animationEvent && el.addEventListener(animationEvent, function () {
    this.className = '';
  });
}

function whichAnimationEvent() {
  var t,
      el = document.createElement('fakeelement'),
      animations = {
    'animation': 'animationend',
    'OAnimation': 'oAnimationEnd',
    'MozAnimation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  };
  for (t in animations) {
    if (el.style[t] !== undefined) {
      return animations[t];
    }
  }
}

/***/ }),

/***/ 758:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[757]);