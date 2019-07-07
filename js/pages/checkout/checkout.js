(function (factory) {
	typeof define === 'function' && define.amd ? define('checkout', factory) :
	factory();
}(function () { 'use strict';

	Vue.filter("currency", function (value) {
	  return parseFloat(value).toFixed(2) + " TL";
	});
	Vue.component('orderSummary', {
	  props: ['total', 'kdv'],
	  template: '#order-summary'
	});
	Vue.component('basketList', {
	  props: ['product'],
	  template: '#basket-list'
	});
	Vue.component('campaignBox', {
	  data() {
	    return {
	      accordionId: 0
	    };
	  },

	  props: {
	    giftcard: {
	      type: Boolean
	    }
	  },
	  template: '#campaign-box',
	  methods: {
	    accordion: function (id) {
	      this.accordionId = id;
	    }
	  }
	});
	Vue.component('payment', {
	  data() {
	    return {
	      accordionId: 0,
	      masterpassActive: true,
	      openedModal: false,
	      selectedId: 0,
	      isActive: 0
	    };
	  },

	  props: [],
	  template: '#payment-method',
	  methods: {
	    changePaymentType: function (id) {
	      this.selectedId = id;
	    },
	    saveChangeMasterpass: function (id) {
	      this.isActive = id;
	    },
	    showModal: function (id) {
	      this.openedModal = id;
	    }
	  }
	});
	const checkout = new Vue({
	  el: '[data-checkout]',

	  data() {
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
	    getProducts() {
	      let vm = this;
	      let requestUrl = vm.api.url;
	      vm.loading = true;
	      axios.get(requestUrl).then(response => {
	        vm.products = response.data.product;
	        vm.loading = false;
	      }).catch(error => {
	        vm.products = [];
	      });
	    },

	    removeFromCart: function (item) {
	      item.quantity -= 1;
	      this.products.splice(this.products.indexOf(item), 1);
	    }
	  },
	  computed: {
	    total() {
	      return this.products.reduce((sum, item) => {
	        return sum + item.salePrice * item.quantity;
	      }, 0);
	    },

	    modal() {
	      conole.log("burda");
	      let modal = document.querySelector("[modal]");
	    }

	  }
	});
	checkout.getProducts();

}));

//# sourceMappingURL=../../maps/pages/checkout/checkout.js.map
