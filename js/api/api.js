(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios')) :
	typeof define === 'function' && define.amd ? define('api', ['exports', 'axios'], factory) :
	(global = global || self, factory(global.api = {}, global.axios));
}(this, function (exports, axios) { 'use strict';

	axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

	// const baseURL = "/V2/";
	// const baseURL = "http://10.100.12.103:5000/";
	const baseURL = "http://www.mocky.io/v2/";
	let apiConfig = {
	  baseURL,
	  // getProductDetail: "getproductdetail/751b3a7b0a84189d"
	  getProductDetail: "5d21d8742f00006e2cc46351"
	};

	const http = axios.create({
	  // baseURL: "http://10.100.12.103:5000/",
	  baseURL: "http://www.mocky.io/v2/5d21d8742f00006e2cc46351/"
	});
	http.interceptors.request.use(function (config) {
	  return config;
	}, error => Promise.reject(error));
	http.interceptors.response.use(function (response) {
	  return response;
	}, error => Promise.reject(error));
	function _getProductDetail() {
	  return new Promise((resolve, reject) => {
	    let requestUrl = apiConfig.getProductDetail;
	    return http.get(requestUrl).then(response => resolve(response)).catch(error => reject(error));
	  });
	}

	exports._getProductDetail = _getProductDetail;

	Object.defineProperty(exports, '__esModule', { value: true });

}));

//# sourceMappingURL=../maps/api/api.js.map
