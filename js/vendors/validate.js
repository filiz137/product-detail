(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('validate', factory) :
	(global = global || self, global.validate = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var validate_1 = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
	  {
	    module.exports = factory(root);
	  }
	})(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : commonjsGlobal.window || commonjsGlobal.global, function (root) {
	  // Variables
	  //

	  var validate = {}; // Object for public APIs

	  var supports = 'querySelector' in document && 'addEventListener' in root; // Feature test

	  var settings; // Default settings

	  var defaults = {
	    // Classes and Selectors
	    selector: '[data-validate]',
	    fieldClass: '-err',
	    errorClass: '-errMsg',
	    // Messages
	    messageValueMissing: 'Bu alan boş bırakılamaz!',
	    messageValueMissingSelect: 'Lütfen seçim yapınız.',
	    messageValueMissingSelectMulti: 'Lütfen en az bir seçim yapınız.',
	    messageTypeMismatchEmail: 'Lütfen eposta adresinizi giriniz.',
	    messageTypeMismatchPassword: 'Lütfen şifrenizi giriniz.',
	    messageTooShort: 'En az {minLength} karakter olmalı. Sadece {length} karakter girdiniz.',
	    messageTooLong: 'En fazla {maxLength} karakter olmalı. {length} karakter girdiniz.',
	    messagePatternMismatch: 'Lütfen istenilen formatta giriniz.',
	    messageBadInput: 'Lüften rakam giriniz.',
	    messageStepMismatch: 'Lütfen geçerli bir değer seçiniz.',
	    messageRangeOverflow: 'Please select a value that is no more than {max}.',
	    messageRangeUnderflow: 'Please select a value that is no less than {min}.',
	    messageGeneric: 'Bu alan için girdiğiniz değer geçersiz.',
	    // Form Submission
	    disableSubmit: false,
	    onSubmit: function () {},
	    // Callbacks
	    beforeShowError: function () {},
	    afterShowError: function () {},
	    beforeRemoveError: function () {},
	    afterRemoveError: function () {}
	  }; //
	  // Methods
	  //
	  // Element.matches() polyfill

	  if (!Element.prototype.matches) {
	    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
	      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	          i = matches.length;

	      while (--i >= 0 && matches.item(i) !== this) {}

	      return i > -1;
	    };
	  }
	  /**
	   * Merge two or more objects. Returns a new object.
	   * @private
	   * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	   * @param {Object}   objects  The objects to merge together
	   * @returns {Object}          Merged values of defaults and options
	   */


	  var extend = function () {
	    // Variables
	    var extended = {};
	    var deep = false;
	    var i = 0;
	    var length = arguments.length; // Check if a deep merge

	    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
	      deep = arguments[0];
	      i++;
	    } // Merge the object into the extended object


	    var merge = function (obj) {
	      for (var prop in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	          // If deep merge and property is an object, merge properties
	          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
	            extended[prop] = extend(true, extended[prop], obj[prop]);
	          } else {
	            extended[prop] = obj[prop];
	          }
	        }
	      }
	    }; // Loop through each object and conduct a merge


	    for (; i < length; i++) {
	      var obj = arguments[i];
	      merge(obj);
	    }

	    return extended;
	  };
	  /**
	   * Get the closest matching element up the DOM tree.
	   * @private
	   * @param  {Element} elem     Starting element
	   * @param  {String}  selector Selector to match against
	   * @return {Boolean|Element}  Returns null if not match found
	   */


	  var getClosest = function (elem, selector) {
	    for (; elem && elem !== document; elem = elem.parentNode) {
	      if (elem.matches(selector)) return elem;
	    }

	    return null;
	  };
	  /**
	   * Validate a form field
	   * @public
	   * @param  {Node}    field   The field to validate
	   * @param  {Object}  options User options
	   * @return {String}          The error message
	   */


	  validate.hasError = function (field, options) {
	    // Merge user options with existing settings or defaults
	    var localSettings = extend(settings || defaults, options || {}); // Don't validate submits, buttons, file and reset inputs, and disabled fields

	    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return; // Get validity

	    var validity = field.validity; // If valid, return null

	    if (validity.valid) return; // If field is required and empty

	    if (validity.valueMissing) {
	      if (field.type === 'select-multiple') return localSettings.messageValueMissingSelectMulti;
	      if (field.type === 'select-one') return localSettings.messageValueMissingSelect;
	      return localSettings.messageValueMissing;
	    } // If not the right type


	    if (validity.typeMismatch) {
	      // Email
	      // if (field.type === 'email') return localSettings.messageTypeMismatchEmail;
	      // Password
	      if (field.type === 'password') return localSettings.messageTypeMismatchPassword;
	    } // If too short


	    if (validity.tooShort) return localSettings.messageTooShort.replace('{minLength}', field.getAttribute('minLength')).replace('{length}', field.value.length); // If too long

	    if (validity.tooLong) return localSettings.messageTooLong.replace('{minLength}', field.getAttribute('maxLength')).replace('{length}', field.value.length); // If number input isn't a number

	    if (validity.badInput) return localSettings.messageBadInput; // If a number value doesn't match the step interval

	    if (validity.stepMismatch) return localSettings.messageStepMismatch; // If a number field is over the max

	    if (validity.rangeOverflow) return localSettings.messageRangeOverflow.replace('{max}', field.getAttribute('max')); // If a number field is below the min

	    if (validity.rangeUnderflow) return localSettings.messageRangeUnderflow.replace('{min}', field.getAttribute('min')); // If pattern doesn't match

	    if (validity.patternMismatch) {
	      // If pattern info is included, return custom error
	      if (field.hasAttribute('title')) return field.getAttribute('title'); // Otherwise, generic error

	      return localSettings.messagePatternMismatch;
	    } // If all else fails, return a generic catchall error


	    return localSettings.messageGeneric;
	  };
	  /**
	   * Show an error message on a field
	   * @public
	   * @param  {Node}   field   The field to show an error message for
	   * @param  {String} error   The error message to show
	   * @param  {Object} options User options
	   */


	  validate.showError = function (field, error, options) {
	    // Merge user options with existing settings or defaults
	    var localSettings = extend(settings || defaults, options || {}); // Before show error callback

	    localSettings.beforeShowError(field, error); // Add error class to field

	    field.classList.add(localSettings.fieldClass); // If the field is a radio button and part of a group, error all and get the last item in the group

	    if (field.type === 'radio' && field.name) {
	      var group = document.getElementsByName(field.name);

	      if (group.length > 0) {
	        for (var i = 0; i < group.length; i++) {
	          if (group[i].form !== field.form) continue; // Only check fields in current form

	          group[i].classList.add(localSettings.fieldClass);
	        }

	        field = group[group.length - 1];
	      }
	    } // Get field id or name


	    var id = field.id || field.name;
	    if (!id) return; // Check if error message field already exists
	    // If not, create one

	    var message = field.form.querySelector('.' + localSettings.errorClass + '#error-for-' + id);

	    if (!message) {
	      message = document.createElement('div');
	      message.className = localSettings.errorClass;
	      message.id = 'error-for-' + id; // If the field is a radio button or checkbox, insert error after the label

	      var label;

	      if (field.type === 'radio' || field.type === 'checkbox') {
	        label = field.form.querySelector('label[for="' + id + '"]') || getClosest(field, 'label');

	        if (label) {
	          label.parentNode.insertBefore(message, label.nextSibling);
	        }
	      } // Otherwise, insert it after the field


	      if (!label) {
	        field.parentNode.insertBefore(message, field.nextSibling);
	      }
	    } // Add ARIA role to the field


	    field.setAttribute('aria-describedby', 'error-for-' + id); // Update error message

	    message.innerHTML = error; // Remove any existing styles hiding the error message

	    message.style.display = '';
	    message.style.visibility = ''; // After show error callback

	    localSettings.afterShowError(field, error);
	  };
	  /**
	   * Remove an error message from a field
	   * @public
	   * @param  {Node}   field   The field to remove the error from
	   * @param  {Object} options User options
	   */


	  validate.removeError = function (field, options) {
	    // Merge user options with existing settings or defaults
	    var localSettings = extend(settings || defaults, options || {}); // Before remove error callback

	    localSettings.beforeRemoveError(field); // Remove ARIA role from the field

	    field.removeAttribute('aria-describedby'); // Remove error class to field

	    field.classList.remove(localSettings.fieldClass); // If the field is a radio button and part of a group, remove error from all and get the last item in the group

	    if (field.type === 'radio' && field.name) {
	      var group = document.getElementsByName(field.name);

	      if (group.length > 0) {
	        for (var i = 0; i < group.length; i++) {
	          if (group[i].form !== field.form) continue; // Only check fields in current form

	          group[i].classList.remove(localSettings.fieldClass);
	        }

	        field = group[group.length - 1];
	      }
	    } // Get field id or name


	    var id = field.id || field.name;
	    if (!id) return; // Check if an error message is in the DOM

	    var message = field.form.querySelector('.' + localSettings.errorClass + '#error-for-' + id + '');
	    if (!message) return; // If so, hide it

	    message.innerHTML = '';
	    message.style.display = 'none';
	    message.style.visibility = 'hidden'; // After remove error callback

	    localSettings.afterRemoveError(field);
	  };
	  /**
	   * Add the `novalidate` attribute to all forms
	   * @private
	   * @param {Boolean} remove  If true, remove the `novalidate` attribute
	   */


	  var addNoValidate = function (remove) {
	    var forms = document.querySelectorAll(settings.selector);

	    for (var i = 0; i < forms.length; i++) {
	      if (remove) {
	        forms[i].removeAttribute('novalidate');
	        continue;
	      }

	      forms[i].setAttribute('novalidate', true);
	    }
	  };
	  /**
	   * Check field validity when it loses focus
	   * @private
	   * @param  {Event} event The blur event
	   */


	  var blurHandler = function (event) {
	    // Only run if the field is in a form to be validated
	    if (!event.target.form || !event.target.form.matches(settings.selector)) return; // Validate the field

	    var error = validate.hasError(event.target); // If there's an error, show it

	    if (error) {
	      validate.showError(event.target, error);
	      return;
	    } // Otherwise, remove any errors that exist


	    validate.removeError(event.target);
	  };
	  /**
	   * Check radio and checkbox field validity when clicked
	   * @private
	   * @param  {Event} event The click event
	   */


	  var clickHandler = function (event) {
	    // Only run if the field is in a form to be validated
	    if (!event.target.form || !event.target.form.matches(settings.selector)) return; // Only run if the field is a checkbox or radio

	    var type = event.target.getAttribute('type');
	    if (!(type === 'checkbox' || type === 'radio')) return; // Validate the field

	    var error = validate.hasError(event.target); // If there's an error, show it

	    if (error) {
	      validate.showError(event.target, error);
	      return;
	    } // Otherwise, remove any errors that exist


	    validate.removeError(event.target);
	  };
	  /**
	   * Check all fields on submit
	   * @private
	   * @param  {Event} event  The submit event
	   */


	  var submitHandler = function (event) {
	    // Only run on forms flagged for validation
	    if (!event.target.matches(settings.selector)) return; // Get all of the form elements

	    var fields = event.target.elements; // Validate each field
	    // Store the first field with an error to a variable so we can bring it into focus later

	    var hasErrors;

	    for (var i = 0; i < fields.length; i++) {
	      var error = validate.hasError(fields[i]);

	      if (error) {
	        validate.showError(fields[i], error);

	        if (!hasErrors) {
	          hasErrors = fields[i];
	        }
	      }
	    } // Prevent form from submitting if there are errors or submission is disabled


	    if (hasErrors || settings.disableSubmit) {
	      event.preventDefault();
	    } // If there are errrors, focus on first element with error


	    if (hasErrors) {
	      hasErrors.focus();
	      return;
	    } // Otherwise, submit the form


	    settings.onSubmit(event.target, fields);
	  };
	  /**
	   * Check all fields on button type not submit
	   * @public
	   * @param  {Object}  form Form
	   * @return {String}  The error message
	   */


	  validate.clickSubmit = function (form) {
	    // Only run on forms flagged for validation
	    if (!form.matches(settings.selector)) return; // Get all of the form elements

	    var fields = form.elements; // Validate each field
	    // Store the first field with an error to a variable so we can bring it into focus later

	    var hasErrors;

	    for (var i = 0; i < fields.length; i++) {
	      var error = validate.hasError(fields[i]);

	      if (error) {
	        validate.showError(fields[i], error);

	        if (!hasErrors) {
	          hasErrors = fields[i];
	        }
	      }
	    } // Prevent form from submitting if there are errors or submission is disabled


	    if (hasErrors || settings.disableSubmit) {
	      event.preventDefault();
	    } // If there are errrors, focus on first element with error


	    if (hasErrors) {
	      hasErrors.focus();
	      return;
	    }
	  };
	  /**
	   * Destroy the current initialization.
	   * @public
	   */


	  validate.destroy = function () {
	    // If plugin isn't already initialized, stop
	    if (!settings) return; // Remove event listeners

	    document.removeEventListener('blur', blurHandler, true);
	    document.removeEventListener('click', clickHandler, false);
	    document.removeEventListener('submit', submitHandler, false); // Remove all errors

	    var fields = document.querySelectorAll(settings.errorClass);

	    for (var i = 0; i < fields.length; i++) {
	      validate.removeError(fields[i]);
	    } // Remove `novalidate` from forms


	    addNoValidate(true); // Reset variables

	    settings = null;
	  };
	  /**
	   * Initialize Validate
	   * @public
	   * @param {Object} options User settings
	   */


	  validate.init = function (options) {
	    // feature test
	    if (!supports) return; // Destroy any existing initializations

	    validate.destroy(); // Merge user options with defaults

	    settings = extend(defaults, options || {}); // Add the `novalidate` attribute to all forms

	    addNoValidate(); // Event listeners

	    document.addEventListener('blur', blurHandler, true);
	    document.addEventListener('click', clickHandler, true);
	    document.addEventListener('submit', submitHandler, false);
	  }; //
	  // Public APIs
	  //


	  return validate;
	});

	validate.init(); //ajax postlar için validate
	});

	return validate_1;

}));

//# sourceMappingURL=../maps/vendors/validate.js.map
