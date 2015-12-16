!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("base"),require("core"),require("ui"),require("module-contacts"),require("module-payments"),require("module-transactions"),require("module-accounts")):"function"==typeof define&&define.amd?define(["base","core","ui","module-contacts","module-payments","module-transactions","module-accounts"],e):"object"==typeof exports?exports["widget-addressbook"]=e(require("base"),require("core"),require("ui"),require("module-contacts"),require("module-payments"),require("module-transactions"),require("module-accounts")):t["widget-addressbook"]=e(t.base,t.core,t.ui,t["module-contacts"],t["module-payments"],t["module-transactions"],t["module-accounts"])}(this,function(t,e,n,o,c,a,r){return function(t){function e(o){if(n[o])return n[o].exports;var c=n[o]={exports:{},id:o,loaded:!1};return t[o].call(c.exports,c,c.exports,e),c.loaded=!0,c.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var o;(function(t){o=function(require,t,e){"use strict";function o(t,e,n,o,c){n.setConfig({paymentsEndpoint:t.getPreference("paymentOrdersDataSrc")}),o.setConfig({transactionsEndpoint:e.resolvePortalPlaceholders("$(contextPath)/services/rest/v1/current-accounts/$(accountId)/transactions"),pageSize:5}),c.publish("cxp.item.loaded",{id:t.model.name})}e.name="widget-addressbook";var c=n(2),a=n(3),r=n(4),s=n(5),l=n(6),i=n(7),d=n(8),u=[a.name,r.name,s.name,l.name,d.name,i.name];o.$inject=["lpWidget","lpCoreUtils","lpPayments","lpTransactions","lpCoreBus"],e.exports=c.createModule(e.name,u).controller(n(9)).run(o)}.call(e,n,e,t),!(void 0!==o&&(t.exports=o))}).call(e,n(1)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(e,n){e.exports=t},function(t,n){t.exports=e},function(t,e){t.exports=n},function(t,e){t.exports=o},function(t,e){t.exports=c},function(t,e){t.exports=a},function(t,e){t.exports=r},function(t,e,n){var o;o=function(require,t,e){"use strict";t.ContactsController=function(t,e,n,o,c,a,r,s,l,i,d){var u=3e3,f=i,m=n,p=function(){t.contactsModel.loadContacts().error(function(){t.addAlert("SERVICE_UNAVAILABLE","error",!1)})},C=function(){var n={contacts:d.resolvePortalPlaceholders(m.getPreference("contactListDataSrc")),contactData:d.resolvePortalPlaceholders(m.getPreference("contactDataSrc")),contactDetails:d.resolvePortalPlaceholders(m.getPreference("contactDetailsDataSrc")),locale:m.getPreference("locale"),lazyload:!0};t.contactsModel=new o(n),s.loadMessages(m,t.locale).success(function(e){t.messages=e.messages}),t.contactsModel.disableSelection=!1,t.title=m.getPreference("title"),p(),f.subscribe("launchpad.contacts.load",function(){e(function(){p()})})},y=function(){t.accountsModel||(t.accountsModel=c,t.accountsModel.setConfig({accountsEndpoint:"$(contextPath)/services/rest/v1/debit-accounts",filter:"cards"})),t.lpTransactions||(t.lpTransactions=a.api())},M=function(){t.contactFields=[];var e=t.contactsModel.currentDetails;d.forEach(t.allContactFields,function(n){var o=n.key;e.hasOwnProperty(o)&&null!==e[o]||t.contactFields.push(n)})};t.contactChangeView=function(e){t.contactsModel.moduleState!==e&&(t.contactsModel.moduleState=e,("contactsEdit"===e||"contactsAdd"===e)&&M()),t.contactsModel.disableSelection="contactsView"!==e?!0:!1},t.addContact=function(){if(!t.contactsModel.disableSelection){var e=d.generateUUID(),n=t.contactsModel;n.selected=null,t.copyCurrentContact(),y(),n.currentContact={photoUrl:null,partyId:l,id:e,name:"",account:"",isNew:!0},n.currentDetails={id:e},t.contactChangeView("contactsAdd")}};var h=function(e){var n=t.accountsModel,o=n.accounts,c=n.findByAccountNumber(m.getPreferenceFromParents("defaultAccount"));void 0===t.defaultAccount&&(t.defaultAccount=c?c:o[0],n.selected=c?c:o[0]),o&&o.length>0&&(t.lpTransactions.setFilters({contact:e.account}),t.lpTransactions.loadTransactions(t.defaultAccount)),t.$broadcast("contactSelected",e)},g=function(e){if(y(),t.accountsModel.accounts.length)h(e);else{var n=t.accountsModel.load();n.then(function(){h(e)})}};t.selectContact=function(e){t.contactsModel.selectContact(e),e.account||e.email?g(e):t.lpTransactions.clearTransactionsList(),t.$broadcast("contactSelected",e)},t.launchTransactionsForContact=function(t){f.publish("launchpad-retail.transactions.applyFilter",{contactName:t.name,filters:{contact:t.account}})};var v=function(e){var n=!0;return t.errors={},d.forEach(t.allContactFields,function(o){var c=o.key,a=e[c];if(o.validate&&a){var r=o.validate(a);r&&(t.errors[c]=r,n=!1)}}),n};t.alert={messages:{SAVED_SUCCESSFULLY:"Contact was saved successfully.",SAVED_ERROR:"There was an error while saving contact.",SERVICE_UNAVAILABLE:"Unfortunately, this service is unavailable."}},t.alerts=[],t.addAlert=function(n,o,c){var a={type:o||"error",msg:t.alert.messages[n]};t.alerts.push(a),c!==!1&&e(function(){t.closeAlert(t.alerts.indexOf(a))},u)},t.closeAlert=function(e){t.alerts.splice(e,1)},t.clearAlerts=function(){t.alerts=[]},t.submitContact=function(e){if(!v(t.contactsModel.currentDetails)||!e)return!1;var n;n=t.contactsModel.currentContact.isNew?t.contactsModel.createContact(e):t.contactsModel.updateContact(e),n.success(function(e){t.contactsModel.currentContact.isNew=!1,g(t.contactsModel.currentContact),t.addAlert("SAVED_SUCCESSFULLY","success")}).error(function(e){t.addAlert("SAVED_ERROR","error")})};var w=function(e){for(var n=-1,o=0,c=t.contactsModel.contactDetailsData.length;c>o;o++){var a=t.contactsModel.contactDetailsData[o];if(a.id===e.id){n=o;break}}n>-1&&(t.contactsModel.contactDetailsData[o]=d.clone(e))};t.cancelForm=function(){"contactsAdd"===t.contactsModel.moduleState?(t.contactsModel.currentContact=t.contactsModel.originalContact?t.contactsModel.originalContact:null,t.contactChangeView("contactsView")):"contactsEdit"===t.contactsModel.moduleState?(t.contactsModel.currentContact=t.contactsModel.originalContact,w(t.contactsModel.originalDetails),t.contactsModel.contacts[t.contactsModel.idx]=t.contactsModel.originalContact,t.contactChangeView("contactsView")):t.contactChangeView("contactsNone"),t.contactsModel.refreshModel()},t.editContact=function(){t.copyCurrentContact(),t.contactChangeView("contactsEdit")},t.addFormField=function(e){t.contactsModel.currentDetails||(t.contactsModel.currentDetails={id:t.contactsModel.currentContact.id}),t.contactsModel.currentDetails[e]||(t.contactsModel.currentDetails[e]=""),M()},t.deleteFormField=function(e){delete t.contactsModel.currentDetails[e],M()},t.canAddFields=function(){return t.contactFields.length>0},t.copyCurrentContact=function(){t.contactsModel.originalContact=d.clone(t.contactsModel.currentContact),t.contactsModel.originalDetails=d.clone(t.contactsModel.currentDetails)},t.filterContactData=function(t){var e={},n=["address","city","state","dateOfBirth","email","phone"];return d.forEach(t,function(t,o){null!==t&&n.forEach(function(n){n===o&&(e[o]=t)})}),e},t.allContactFields=[{text:"Phone",key:"phone",validate:function(t){var e=/^\+?([0-9]{2})\)?[\-. ]?([0-9]{4})[\-. ]?([0-9]{4})$/;return t.match(e)?!1:"Phone number must have 10 digits."}},{text:"E-mail",key:"email"},{text:"Birthday",key:"dateOfBirth"},{text:"Address",key:"address"},{text:"City",key:"city"},{text:"State",key:"state"}],t.contactFields=[],t.$watch("contactsModel.moduleState",function(e){e&&(t.contactsModel.template="templates/"+e+".html")}),t.$watch("contactsModel.contacts",function(n){n.length>0?(t.contactsModel.moduleState="contactsView",t.waitToLoadContactPromise&&e.cancel(t.waitToLoadContactPromise),"large"===t.widgetSize&&(t.waitToLoadContactPromise=e(function(){t.selectContact(t.contactsModel.currentContact?t.contactsModel.currentContact:t.contactsModel.contacts[0])},300))):t.contactsModel.moduleState="contactsNone"}),t.decodePhotoUrl=function(t){return t?decodeURIComponent(t):d.defaultProfileImage},t.$watch("search",function(n){if(t.filteredContacts=[],n){t.filter=!0;var o=n.toLowerCase();d.forEach(t.contactsModel.contacts,function(e){if(d.isString(e.name)){var n=e.name.toLowerCase(),c=d.isString(e.account)?e.account.toLowerCase():"";(-1!==n.indexOf(o)||-1!==c.indexOf(o))&&t.filteredContacts.push(e)}}),"large"===t.widgetSize&&(t.waitToLoadContactPromise&&e.cancel(t.waitToLoadContactPromise),t.waitToLoadContactPromise=e(function(){t.filteredContacts.length&&t.selectContact(t.filteredContacts[0])},300))}else t.filter=!1,t.contactsModel.contacts.length&&"large"===t.widgetSize&&t.selectContact(t.contactsModel.contacts[0])},!0),t.responsiveRules=[{max:200,size:"tile"},{min:201,max:400,size:"small"},{min:401,size:"large"}],m.addEventListener("preferencesSaved",function(){m.refreshHTML(),C()}),t.widgetReset=function(e){t.search&&(t.search=""),("contactsEdit"===t.contactsModel.moduleState||"contactsAdd"===t.contactsModel.moduleState)&&t.cancelForm()},t.disableEnterSubmit=function(t){return t&&13===t.which?void t.preventDefault():void 0},C()},t.ContactsController.$inject=["$scope","$timeout","lpWidget","ContactsModel","AccountsModel","lpTransactions","$filter","i18nUtils","customerId","lpCoreBus","lpCoreUtils"],t.ContactsPaymentController=function(t,e,n,o){var c=n,a=e.api();t.paymentOrder=a.createModel(),t.resetPaymentOrder=function(e){var n,c;void 0!==e?(n=e.name,c=e.account):(n=t.paymentOrder.counterpartyName,c=t.paymentOrder.counterpartyIban),t.paymentOrderForm.submitted=!1,t.paymentOrder.uuid=o.generateUUID(),t.paymentOrder.dateOptions="today",t.paymentOrder.paymentMode="NON_RECURRING",t.paymentOrder.onDate=+new Date,t.paymentOrder.counterpartyIban=c,t.paymentOrder.counterpartyAccount=n,t.paymentOrder.counterpartyName=n,t.paymentOrder.accountName=n,t.paymentOrder.type="INTERNAL"},t.$on("contactSelected",function(e,n){t.resetPaymentOrder(n)}),t.submitPayment=function(){var e,n,o;return t.paymentOrderForm.submitted=!0,t.paymentOrderForm.$invalid?!1:(n=t.paymentOrder,o=t.accountsModel.selected,t.resetPaymentOrder(),t.paymentOrder.accountId=o.id,t.paymentOrder.instructedCurrency=o.currency,e=n.createOrder(n),void e.then(function(t){c.publish("launchpad-retail.paymentOrderInitiated",{paymentId:n.id})},function(t){console.log("Server error: "+t.statusText)}))}},t.ContactsPaymentController.$inject=["$scope","lpPayments","lpCoreBus","lpCoreUtils"]}.call(e,n,e,t),!(void 0!==o&&(t.exports=o))}])});