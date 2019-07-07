(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('axios')) :
	typeof define === 'function' && define.amd ? define('productDetail', ['axios'], factory) :
	(global = global || self, factory(global.axios));
}(this, function (axios) { 'use strict';

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

	let productGallery;
	let options = {
	  loop: true,
	  loadPrevNext: true,
	  preloadImages: false,
	  clickable: true,
	  // updateOnImagesReady: false,
	  // lazy: true,
	  pagination: {
	    el: ".swiper-pagination"
	  },
	  navigation: {
	    nextEl: ".swiper-button-next",
	    prevEl: ".swiper-button-prev"
	  }
	};

	window.onload = function (e) {
	  productGallery = new Swiper(".swiper-container", options);
	};

	const productDetail = new Vue({
	  el: "[data-product]",
	  data: {
	    cdnPath: "https://statics.boyner.com.tr/",
	    product: {
	      attributes: {
	        brand: "",
	        brandUrl: "",
	        isFreeCargo: false
	      },
	      name: "",
	      images: [],
	      discountRate: ""
	    }
	  },

	  created() {
	    let vm = this;
	    vm.getProductDetail();
	  },

	  methods: {
	    getProductDetail: async function () {
	      let vm = this;
	      let response = await _getProductDetail();
	      vm.product = response.data;
	      vm.product.name = vm.product.Name;
	      vm.product.images = vm.product.ImageList;
	      vm.product.attributes = vm.product.Attributes;
	      vm.product.discountRate = vm.product.DiscountRate;
	    }
	  }
	});

}));

//# sourceMappingURL=../../maps/pages/product/product-detail.js.map
