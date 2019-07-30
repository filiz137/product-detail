(function (factory) {
	typeof define === 'function' && define.amd ? define('delivery', factory) :
	factory();
}(function () { 'use strict';

	Vue.component('addressModal', {
	  template: '#address-modal',
	  methods: {
	    hideAddressModal: function hideAddressModal(event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'auto';
	      delivery.isShownAddressModal = false;
	    }
	  }
	});
	Vue.component('shopModal', {
	  template: '#shop-modal',
	  methods: {
	    hideShopModal: function hideShopModal(event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'auto';
	      delivery.isShownShopModal = false;
	    }
	  }
	});
	var delivery = new Vue({
	  el: '[data-delivery]',
	  data: function data() {
	    return {
	      isShownAddressModal: false,
	      isShownShopModal: false
	    };
	  },
	  methods: {
	    labelFocus: function labelFocus() {
	      var inputs = document.querySelectorAll("input, textarea");
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var input = _step.value;

	          if (input.value != "") {
	            input.parentNode.classList.add("-focus");
	          }

	          input.addEventListener("focus", function (event) {
	            input.parentNode.classList.add("-focus");
	          }, false);
	          input.addEventListener("blur", function (event) {
	            if (!input.value.length > 0) input.parentNode.classList.remove("-focus");
	          });
	        };

	        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    },
	    showAddressModal: function showAddressModal(event) {
	      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
	      this.isShownAddressModal = true;
	    },
	    showShopModal: function showShopModal(event) {
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
