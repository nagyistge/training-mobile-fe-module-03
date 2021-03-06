define(function (require, exports, module) {
    'use strict';

    module.name = 'component.user-reset-password';

    var base = require('base');
    var core = require('core');

    var deps = [
        core.name
    ];

    module.exports = base.createModule(module.name, deps)
        .directive( require('./directives') );
});
