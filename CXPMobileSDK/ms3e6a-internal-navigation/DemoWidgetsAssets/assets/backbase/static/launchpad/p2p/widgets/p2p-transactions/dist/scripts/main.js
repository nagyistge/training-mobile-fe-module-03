!function(e,n){"object"==typeof exports&&"object"==typeof module?module.exports=n(require("base"),require("core"),require("ui"),require("module-contacts"),require("module-transactions")):"function"==typeof define&&define.amd?define(["base","core","ui","module-contacts","module-transactions"],n):"object"==typeof exports?exports["widget-p2p-transactions"]=n(require("base"),require("core"),require("ui"),require("module-contacts"),require("module-transactions")):e["widget-p2p-transactions"]=n(e.base,e.core,e.ui,e["module-contacts"],e["module-transactions"])}(this,function(e,n,t,o,r){return function(e){function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){var o;(function(e){o=function(require,e,n){"use strict";function o(){}n.name="widget-p2p-transactions";var r=t(1),a=t(2),s=t(3),c=t(4),i=t(5),l=[a.name,s.name,c.name,i.name];n.exports=r.createModule(n.name,l).controller(t(6)).run(o)}.call(n,t,n,e),!(void 0!==o&&(e.exports=o))}).call(n,t(7)(e))},function(n,t,o){n.exports=e},function(e,t,o){e.exports=n},function(e,n,o){e.exports=t},function(e,n,t){e.exports=o},function(e,n,t){e.exports=r},function(e,n,t){var o;o=function(require,e,n){"use strict";function t(e){e.$$phase||e.$apply()}e.P2PTransactionsController=function(e,n,o,r,a,s,c,i){var l=c,u=function(n){var o={transactionsEndpoint:i.resolvePortalPlaceholders(r.getPreference("transactionsDataSrc")),transactionMessagesEndpoint:i.resolvePortalPlaceholders(r.getPreference("messageSrc")),pageSize:10,locale:e.locale};e.transactionsModel=s.getInstance(o),e.transactionsModel.loadTransactions([n]).then(function(n){t(e)})},d=function(){e.locale=r.getPreference("locale"),e.title=r.getPreference("title"),e.userEnrolledForP2P=!1,a.getUserEnrollmentDetails().then(function(n){e.userEnrolledForP2P=!0,u(n.data.accountId)},function(n){404===n.status&&(e.userEnrolledForP2P=!1)})};e.loadMoreTransactions=function(){e.transactionsModel.allowMoreResults()&&e.transactionsModel.loadMoreTransactions()},e.transferMoney=function(){l.publish("launchpad-retail.requestMoneyTransfer"),l.publish("launchpad-retail.requestMoneyTransfer.setTab",{tab:"P2P_EMAIL"})},e.enroll=function(){l.publish("launchpad-retail.openP2PEnrollment")},l.subscribe("launchpad-retail.p2pTransactions.newTransferSubmitted",function(){o(function(){e.transactionsModel.clearTransactionsList(),e.transactionsModel.loadMoreTransactions()},3e3)}),d()},e.P2PTransactionsController.$inject=["$scope","$element","$timeout","lpWidget","P2PService","P2PTransactionsModel","lpCoreBus","lpCoreUtils"]}.call(n,t,n,e),!(void 0!==o&&(e.exports=o))},function(e,n,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});