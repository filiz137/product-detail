(function (factory) {
	typeof define === 'function' && define.amd ? define('checkout', factory) :
	factory();
}(function () { 'use strict';

	Vue.filter("currency", function (value) {
	  return parseFloat(value).toFixed(2) + " TL";
	});
	Vue.component("orderSummary", {
	  props: ["total", "kdv"],
	  template: "#order-summary"
	});
	Vue.component("basketList", {
	  props: ["product"],
	  template: "#basket-list"
	});
	Vue.component("campaignBox", {
	  data: function data() {
	    return {
	      accordionId: 0
	    };
	  },
	  props: {
	    giftcard: {
	      type: Boolean
	    }
	  },
	  template: "#campaign-box",
	  methods: {
	    accordion: function accordion(id) {
	      this.accordionId = id;
	    }
	  }
	});
	Vue.component("payment", {
	  data: function data() {
	    return {
	      accordionId: 0,
	      masterpassActive: true,
	      openedModal: false,
	      selectedId: 0,
	      isActive: 0
	    };
	  },
	  props: [],
	  template: "#payment-method",
	  methods: {
	    changePaymentType: function changePaymentType(id) {
	      this.selectedId = id;
	    },
	    saveChangeMasterpass: function saveChangeMasterpass(id) {
	      this.isActive = id;
	    },
	    showModal: function showModal(id) {
	      this.openedModal = id;
	    }
	  }
	});
	var checkout = new Vue({
	  el: "[data-checkout]",
	  data: function data() {
	    return {
	      loading: false,
	      products: [],
	      displayItems: {
	        giftcard: false,
	        kdv: true
	      },
	      api: {
	        url: "https://my-json-server.typicode.com/naimdogan/product/db"
	      }
	    };
	  },
	  methods: {
	    getProducts: function getProducts() {
	      var vm = this;
	      var requestUrl = vm.api.url;
	      vm.loading = true;
	      axios.get(requestUrl).then(function (response) {
	        vm.products = response.data.product;
	        vm.loading = false;
	      }).catch(function (error) {
	        vm.products = [];
	      });
	    },
	    removeFromCart: function removeFromCart(item) {
	      item.quantity -= 1;
	      this.products.splice(this.products.indexOf(item), 1);
	    }
	  },
	  computed: {
	    total: function total() {
	      return this.products.reduce(function (sum, item) {
	        return sum + item.salePrice * item.quantity;
	      }, 0);
	    },
	    modal: function modal() {
	      conole.log("burda");
	      var modal = document.querySelector("[modal]");
	    }
	  }
	});
	checkout.getProducts();

}));
