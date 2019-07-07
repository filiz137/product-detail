(function (factory) {
	typeof define === 'function' && define.amd ? define('delivery', factory) :
	factory();
}(function () { 'use strict';

	Vue.component('addressModal', {
	  template: '#address-modal',
	  methods: {
	    hideAddressModal: function (event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'auto';
	      delivery.isShownAddressModal = false;
	    }
	  }
	});
	Vue.component('shopModal', {
	  template: '#shop-modal',
	  methods: {
	    hideShopModal: function (event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'auto';
	      delivery.isShownShopModal = false;
	    }
	  }
	});
	const delivery = new Vue({
	  el: '[data-delivery]',

	  data() {
	    return {
	      isShownAddressModal: false,
	      isShownShopModal: false
	    };
	  },

	  methods: {
	    labelFocus: function () {
	      var inputs = document.querySelectorAll("input, textarea");

	      for (let input of inputs) {
	        if (input.value != "") {
	          input.parentNode.classList.add("-focus");
	        }

	        input.addEventListener("focus", event => {
	          input.parentNode.classList.add("-focus");
	        }, false);
	        input.addEventListener("blur", event => {
	          if (!input.value.length > 0) input.parentNode.classList.remove("-focus");
	        });
	      }
	    },
	    showAddressModal: function (event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	      this.isShownAddressModal = true;
	    },
	    showShopModal: function (event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	      this.isShownShopModal = true;
	    }
	  },
	  mounted: function mounted() {
	    this.labelFocus();
	  },
	  updated: function updated() {
	    this.labelFocus();
	  }
	});

}));

//# sourceMappingURL=../../maps/pages/checkout/delivery.js.map
