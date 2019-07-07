(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('config', ['exports'], factory) :
	(global = global || self, factory(global.config = {}));
}(this, function (exports) { 'use strict';

	// const baseURL = "/V2/";
	// const baseURL = "http://10.100.12.103:5000/";
	const baseURL = "http://www.mocky.io/v2/";
	let apiConfig = {
	  baseURL,
	  // getProductDetail: "getproductdetail/751b3a7b0a84189d"
	  getProductDetail: "5d21d8742f00006e2cc46351"
	};

	exports.apiConfig = apiConfig;

	Object.defineProperty(exports, '__esModule', { value: true });

}));

//# sourceMappingURL=../maps/api/config.js.map
