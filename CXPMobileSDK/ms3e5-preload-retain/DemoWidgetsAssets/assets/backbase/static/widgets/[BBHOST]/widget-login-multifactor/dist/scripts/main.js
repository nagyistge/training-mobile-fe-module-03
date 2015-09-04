!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("base"),require("core"),require("ui"),require("module-users")):"function"==typeof define&&define.amd?define(["base","core","ui","module-users"],e):"object"==typeof exports?exports["widget-login-multifactor"]=e(require("base"),require("core"),require("ui"),require("module-users")):t["widget-login-multifactor"]=e(t.base,t.core,t.ui,t["module-users"])}(this,function(t,e,i,n){return function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){var n;(function(t){n=function(require,t,e){"use strict";function n(t,e,i,n,o){try{var r=i.resolvePortalPlaceholders(e.getPreference("prefixSessionUrl"));n.setConfig({initiateEndPoint:r+e.getPreference("initiateEndPoint"),otpEndPoint:r+e.getPreference("otpEndPoint"),serverRootPath:i.getPortalProperty("serverRoot"),portalName:i.getPortalProperty("portalName"),pageName:i.getPortalProperty("pageName")}),t.initialize()}catch(s){o.captureException(s)}}e.name="widget-login-multifactor";var o=i(1),r=i(2),s=i(3),c=i(4),u=[r.name,c.name,s.name];n.$inject=["loginSteps","lpWidget","lpCoreUtils","lpUsersAuthentication","lpCoreError"],e.exports=o.createModule(e.name,u).constant(i(5)).provider("loginSteps",i(6)).config(i(7)).controller(i(8)).run(n)}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))}).call(e,i(9)(t))},function(e,i,n){e.exports=t},function(t,i,n){t.exports=e},function(t,e,n){t.exports=i},function(t,e,i){t.exports=n},function(t,e,i){var n;n=function(require,t,e){"use strict";t.STEPS={LOGIN:"LOGIN",OTP:"OTP",PRIVACY:"PRIVACY"},t.STORE_LOGIN_ID="login-multifactor-login"}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n;n=function(require,t,e){"use strict";e.exports=function(t){var e,i={},n={shown:!1,onShow:null,onHide:null,back:null,next:null};this.setInitialStep=function(t){e=t},this.setRoutes=function(e){t.extend(i,e)},this.$get=function(o){function r(e){!e.shown&&t.isFunction(e.onShow)&&e.onShow(),e.shown=!0}function s(e){e.shown&&t.isFunction(e.onHide)&&e.onHide(),e.shown=!1}var c={};return c.steps={},c.addStep=function(e,o){if(!e)throw new Error("You must provide an id for the step");this.steps[e]=t.extend({},n),i.hasOwnProperty(e)?t.extend(this.steps[e],i[e],o):t.extend(this.steps[e],o)},c.next=function(){var i=this.steps[e].next;return t.isFunction(i)?void i():void this.to(i)},c.back=function(){var i=this.steps[e].back;return t.isFunction(i)?void i():void this.to(i)},c.to=function(i){e=i,t.forEach(this.steps,s),r(this.steps[e])},c.getCurrent=function(){return e},c.setValues=function(e,i){t.extend(this.steps[e],i)},c.initialize=function(){o(function(){r(c.steps[e])}),c.initialize=t.noop},c},this.$get.$inject=["$timeout"]},e.exports.$inject=["lpCoreUtils"]}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n;n=function(require,t,e){"use strict";e.exports=function(t,e,i,n){var o={};o[n.LOGIN]={back:null,next:n.OTP},o[n.OTP]={back:n.LOGIN,next:n.PRIVACY},o[n.PRIVACY]={back:null,next:null},i.setInitialStep(n.LOGIN),i.setRoutes(o)},e.exports.$inject=["lpCoreUtils","lpCoreTemplateProvider","loginStepsProvider","STEPS"]}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n;n=function(require,t){"use strict";t.MainCtrl=function(t,e,i,n){var o=this;o.steps=n.steps,t.$on("start-loading",function(){o.loading=!0}),t.$on("stop-loading",function(){o.loading=!1}),t.$on("error",function(t,i){e(function(){o.errorMessage=i.message})}),t.$on("error-clean",function(t){e(function(){o.errorMessage=null})})},t.MainCtrl.$inject=["$scope","$timeout","lpCoreUtils","loginSteps"],t.LoginCtrl=i(10),t.OtpCtrl=i(11),t.PrivacyCtrl=i(12)}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e,i){var n;n=function(require,t,e){"use strict";e.exports=function(t,e,i,n,o,r,s,c,u,a){var l=this;l.data={},l.locked=!1,o.subscribe("widget-device-dna:data:ready",function(e){l.data.deviceId=e.deviceId||"",t.$on("initiate-success",function(t){var e=t.deviceId||"";e&&o.subscribe("widget-login-multifactor:status:security-check-success",function(){o.publish("widget-device-dna:device:ready",e)})})}),s.addStep(u.LOGIN,{onShow:function(){n("username")},onHide:function(){l.hasFocus=!1,l.resetFields(),t.$emit("error-clean")}}),l.validate=function(t){},l.submit=function(){t.$emit("start-loading"),t.$emit("error-clean"),r.initiate(l.data).then(function(e){t.$emit("initiate-success",e),r.isInitiated()?(t.$emit("stop-loading"),s.next()):r.isVerified()&&r.securityCheck().then(function(t){o.publish("widget-login-multifactor:status:security-check-success"),r.handleVerifiedResponse(t)},function(e){t.$emit("stop-loading"),t.$emit("error",e)})},function(e){e.code===r.ERROR_CODE.MAX_ATTEMPTS_EXCEEDED&&l.showMaxAttemptsExceeded(),t.$emit("stop-loading"),t.$emit("error",e)})},l.showMaxAttemptsExceeded=function(){l.locked=!0},l.resetFields=function(){l.data.username="",l.data.password=null}},e.exports.$inject=["$scope","$timeout","$window","lpFocus","lpCoreBus","lpUsersAuthentication","loginSteps","lpCoreStore","STEPS","STORE_LOGIN_ID"]}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n;n=function(require,t,e){"use strict";e.exports=function(t,e,i,n,o,r,s,c){var u=this;u.data={},r.addStep(s.OTP,{onShow:function(){o("otp"),t.$broadcast("timer-run")},onHide:function(){u.resetFields()}}),u.submit=function(){return t.$emit("error-clean"),/^\d+$/.test(u.data.otpcode)===!1?void t.$emit("error",{message:"Code must contain only digits"}):(t.$broadcast("timer-pause"),t.$emit("start-loading"),void n.verifyOTP({otpCode:u.data.otpcode}).then(function(e){n.isVerified()&&n.securityCheck().then(function(t){i.publish("widget-login-multifactor:status:security-check-success"),r.next()},function(e){t.$emit("error",e)})["finally"](function(){t.$emit("stop-loading")})},function(e){t.$broadcast("timer-resume"),t.$emit("error",e)})["finally"](function(){t.$emit("stop-loading")}))},u.cancel=function(){r.back()},u.retry=function(){u.resetFields(),o("otp"),t.$broadcast("timer-run")},u.finish=function(i){e(function(){u.timeExpired=!0,t.$emit("error",{message:"Time has expired"})},200)},u.resetFields=function(){u.data.otpcode=null,u.timeExpired=!1,t.$broadcast("timer-reset"),t.$emit("error-clean")}},e.exports.$inject=["$scope","$timeout","lpCoreBus","lpUsersAuthentication","lpFocus","loginSteps","STEPS","lpCoreI18n"]}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))},function(t,e,i){var n;n=function(require,t,e){"use strict";e.exports=function(t,e,i,n,o,r){var s=this;o.addStep(r.PRIVACY,{next:function(){n.isVerified()&&n.securityCheck().then(function(t){i.publish("widget-login-multifactor:status:security-check-success"),n.handleVerifiedResponse(t)},function(e){t.$emit("stop-loading"),t.$emit("error",e)})}}),s.data={privacy:"public"},s.submit=function(){t.$emit("error-clean"),o.next()}},e.exports.$inject=["$scope","$window","lpCoreBus","lpUsersAuthentication","loginSteps","STEPS"]}.call(e,i,e,t),!(void 0!==n&&(t.exports=n))}])});