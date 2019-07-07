(function (factory) {
    typeof define === 'function' && define.amd ? define('account', factory) :
    factory();
}(function () { 'use strict';

    Vue.component("alertModal", {
      props: ["title", "message", "status", "isShow"],
      template: "#alert-modal"
    });
    var account = new Vue({
      el: "[data-account]",
      data: {
        loadingLarge: true,
        loading: false,
        forgotPassword: false,
        showModal: false,
        notification: {
          title: "",
          message: "",
          status: "",
          isShow: false
        },
        responseMessage: {
          message: "",
          isShow: false
        },
        register: {
          Main: {
            FirstName: "",
            LastName: "",
            Email: "",
            CellPhone: "",
            genderid: 3,
            day: "",
            month: "",
            year: "",
            ReceiveCampaignMessages: false,
            FacebookID: document.getElementById("facebookId").value
          },
          NewPassword: "",
          ConfirmNewPassword: "",
          MembershipAgreement: false,
          isGuestQuickBuy: document.getElementById("registerQuickBuy").value,
          ReturnUrl: document.getElementById("registerReturnUrl").value
        },
        login: {
          Email: "",
          Password: "",
          isGuestQuickBuy: document.getElementById("loginQuickBuy").value,
          ReturnUrl: document.getElementById("loginReturnUrl").value,
          Captcha: ""
        },
        guestCheckout: {
          Email: "",
          isGuestQuickBuy: document.getElementById("guestQuickBuy").value,
          ReturnUrl: document.getElementById("guestReturnUrl").value
        },
        forgotPasswords: {
          Email: ""
        }
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
        showPassword: () => {
          var x = document.getElementById("customerPassword");

          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
        },
        matchPassword: function () {
          var password = document.getElementById("password"),
              confirm_password = document.getElementById("passwordConfirmed");

          if (password.value && confirm_password.value) {
            if (password.value != confirm_password.value) {
              password.classList.add("-err");
              password.validity.invalid;
            } else {
              password.classList.remove("-err");
            }
          }
        },
        validCaptcha: function () {
          validate.clickSubmit(document.getElementById("loginForm"));

          if (validForm("loginForm")) {
            grecaptcha.execute();
          }
        },
        loginPost: function (token) {
          var vm = this;
          vm.loading = true;
          vm.login.Captcha = grecaptcha.getResponse();
          var jsonParams = JSON.stringify(this.login);
          var parameters = JSON.parse(jsonParams);
          axios.post("/v2/customer/Login", parameters, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            if (response.data.Success) {
              window.location.href = response.data.Result.returnUrl;
            } else {
              grecaptcha.reset();
              vm.loading = false;
              vm.notification = {
                title: "Üye Girişi",
                message: response.data.Message,
                status: "-error",
                isShow: true
              };
            }
          }).catch(function (error) {
            vm.loading = false;
            grecaptcha.reset();
            vm.notification = {
              title: "Üye Girişi",
              message: "Beklenmeyen bir hata oluştu.",
              status: "-error",
              isShow: true
            };
          });
        },
        registerPost: function () {
          var vm = this;
          var jsonParams = JSON.stringify(this.register);
          var parameters = JSON.parse(jsonParams);
          validate.clickSubmit(document.getElementById("registerForm"));

          if (validForm("registerForm")) {
            vm.loading = true;
            axios.post("/v2/customer/Register", parameters, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (response) {
              if (response.data.Success) {
                window.location.href = response.data.Result.returnUrl;
              } else {
                vm.loading = false;
                vm.notification = {
                  title: "Üye Ol",
                  message: response.data.Message,
                  status: "-error",
                  isShow: true
                };
              }
            }).catch(function (error) {
              vm.loading = false;
              vm.notification = {
                title: "Üye Ol",
                message: "Beklenmeyen bir hata oluştu.",
                status: "-error",
                isShow: true
              };
            });
          }
        },
        guestCheckoutPost: function () {
          var vm = this;
          var jsonParams = JSON.stringify(this.guestCheckout);
          var parameters = JSON.parse(jsonParams);
          validate.clickSubmit(document.getElementById("guestForm"));

          if (validForm("guestForm")) {
            vm.loading = true;
            axios.post("/v2/customer/GuestLogin", parameters, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (response) {
              if (response.data.Success) {
                window.location.href = response.data.Result.returnUrl;
              } else {
                vm.loading = false;
                vm.notification = {
                  title: "Üye Olmadan Satın Al",
                  message: response.data.Message,
                  status: "-error",
                  isShow: true
                };
              }
            }).catch(function (error) {
              vm.loading = false;
              vm.notification = {
                title: "Üye Olmadan Satın Al",
                message: "Beklenmeyen bir hata oluştu.",
                status: "-error",
                isShow: true
              };
            });
          }
        },
        forgotPasswordPost: function () {
          let vm = this;
          const jsonParams = JSON.stringify(this.forgotPasswords);
          const parameters = JSON.parse(jsonParams);
          validate.clickSubmit(document.getElementById("forgotPasswordForm"));

          if (validForm("forgotPasswordForm")) {
            vm.loading = true;
            axios.post("/v2/customer/ForgotPassword", parameters, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (response) {
              if (response.data.Success) {
                vm.responseMessage = {
                  message: response.data.Result.Message,
                  isShow: true
                };
                vm.forgotPassword = true;
                vm.loading = false;
              } else {
                vm.loading = false;
                vm.notification = {
                  title: "Şifremi Unuttum",
                  message: response.data.Message,
                  status: "-error",
                  isShow: true
                };
              }
            }).catch(function (error) {
              vm.loading = false;
              vm.notification = {
                title: "Şifremi Unuttum",
                message: "Beklenmeyen bir hata oluştu.",
                status: "-error",
                isShow: true
              };
            });
          }
        },
        closeFn: function () {
          let vm = this;
          setTimeout(function () {
            vm.notification.isShow = false;
          }, 10000);
        },
        getUserData: function () {
          const vm = this;
          FB.login(function (response) {
            if (response.status == "connected") {
              FB.api("/me", {
                fields: "first_name, last_name, email, id, gender, birthday"
              }, function (resp) {
                vm.checkUserCreated(resp);
              });
            }
          }, {
            scope: "email, user_birthday"
          });
        },
        checkUserCreated: function (response) {
          const vm = this;
          const parameters = {
            email: response.email,
            facebookid: response.id,
            name: response.first_name,
            surname: response.last_name,
            gender: response.gender,
            genderid: response.gender =  1 ,
            birthday: response.birthday
          }; // FB Login donuşunde inputları dolduruyoruz

          const birthDayObj = response.birthday.split("/");
          vm.register.Main.FirstName = response.first_name;
          vm.register.Main.LastName = response.last_name;
          vm.register.Main.Email = response.email;
          vm.register.Main.genderid = parameters.genderid;
          vm.register.Main.day = birthDayObj[0];
          vm.register.Main.month = birthDayObj[1];
          vm.register.Main.year = birthDayObj[2];
          document.getElementById("registerTab").checked = true;
          axios.post("/V2/customer/CheckFacebookAuth", parameters, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            if (response.Success) {
              window.location.href = baseurl;
              return false;
            }

            return false;
          }).catch(function (error) {
            vm.loading = false;
            vm.notification = {
              title: "Facebook ile Bağlan",
              message: "Beklenmeyen bir hata oluştu.",
              status: "-error",
              isShow: true
            };
          });
        }
      },
      mounted: function mounted() {
        this.labelFocus();
        var type = getUrlParameter("type");
        if (type == "uye-ol") document.getElementById("registerTab").checked = true;else if (type == "uye-girisi") document.getElementById("loginTab").checked = true;else if (type == "uye-olmadan-devam-et") document.getElementById("guestTab").checked = true;
      },
      updated: function updated() {
        this.labelFocus();
      },

      created() {
        this.loadingLarge = false;
      }

    });

    function getUrlParameter(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

}));

//# sourceMappingURL=../../maps/pages/account/account.js.map
