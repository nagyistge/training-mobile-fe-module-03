/**
 * Main requirejs config file
 * @param  {object} root    window / global
 * @param  {function} factory function definition
 * @return {object}         requirejs configuration
 * @todo use flat folder structure
 */
(function(root, factory) {
    'use strict';

    // flag to use distribution folder for features / modules
    root.launchpad = root.launchpad || {};
    root.launchpad.config = root.launchpad.config || {
        usemin: true
    };

    var USEMIN = Boolean(root.launchpad.config.usemin);
    var DIST = USEMIN ? 'dist/' : '';
    var host;

    if (typeof exports === 'object') {
        host = require('os').hostname();
        module.exports = factory(root, '');
    } else if (typeof requirejs === 'function') {
        require.config(factory(root, DIST));
        host = root.location.host;
    }
    if(!USEMIN && host.indexOf('local') > -1) {
        console.warn('You are using unminified version of modules/features !!! @', host);
    }

}(this, function(root, dist) {

    'use strict';

    var path = root.launchpad.config.path || 'features/[BBHOST]';

    var config = {

        baseUrl: (function(launchpad) {
            return launchpad.staticRoot || './';
        })(root.launchpad || {}),

        paths: {
            /**
             * Common libs
             */
            // utility belt
            'lodash'                  : [ path + '/lodash/lodash.min', path + '/lodash/lodash' ],
            // fetch
            'fetch'                   : [ path + '/fetch/fetch'],
            // Mobile and gestures
            'hammerjs'                : [ path + '/hammerjs/hammer.min', path + '/hammerjs/hammer' ],
            // date
            'moment'                  : [ path + '/moment/min/moment.min', path + '/moment/moment' ],
            // graphics and animation
            'd3'                      : [ path + '/d3/d3.min', path + '/d3/d3' ],
            // IE8 dependensies for charts including SVG polyfills
            'r2d3'                    : [ path + '/module-polyfills/scripts/r2d3', path + '/module-polyfills/scripts/r2d3'],
            'aight'                    : [ path + '/module-polyfills/scripts/aight', path + '/module-polyfills/scripts/aight'],
            // Template-ing systems
            'handlebars'              : [ path + '/handlebars/handlebars.min', path + '/handlebars/handlebars' ],

            // angular & 3rd party ng libs
            'angular'                 : [ path + '/angular/angular.min', path + '/angular/angular' ],
            'angular-resource'        : [ path + '/angular-resource/angular-resource.min' ],
            'angular-translate'       : [ path + '/angular-translate/angular-translate.min' ],
            'angular-dynamic-locale'  : [ path + '/angular-dynamic-locale/tmhDynamicLocale.min' ],

            // LP foundation
            'base'                    : path + '/base/' + dist + 'scripts',
            'core'                    : path + '/core/' + dist + 'scripts',
            'ui'                      : path + '/ui/' + dist + 'scripts',
            'mock'                    : path + '/mock/dist/scripts',

            // LP modules
            'module-currencies'       : path + '/module-currencies/'+ dist +'scripts',
            'module-accounts'         : path + '/module-accounts/'+ dist +'scripts',
            'module-automation'       : path + '/module-automation/'+ dist +'scripts',
            'module-estatements'      : path + '/module-estatements/'+ dist +'scripts',
            'module-payments'         : path + '/module-payments/'+ dist +'scripts',
            'module-users'            : path + '/module-users/'+ dist +'scripts',
            'module-wealth'           : path + '/module-wealth/'+ dist +'scripts',
            'module-freshness'        : path + '/module-freshness/'+ dist +'scripts',
            'module-tags'             : path + '/module-tags/'+ dist +'scripts',
            'module-charts'           : path + '/module-charts/'+ dist +'scripts',
            'module-badges'           : path + '/module-badges/'+ dist +'scripts',
            'module-expenses'         : path + '/module-expenses/'+ dist +'scripts',
            'module-places'           : path + '/module-places/'+ dist +'scripts',
            'module-ebilling'         : path + '/module-ebilling/'+ dist +'scripts',
            'module-transactions'     : path + '/module-transactions/'+ dist +'scripts',
            'module-contacts'         : path + '/module-contacts/'+ dist +'scripts',
            'module-spring-transition': path + '/module-spring-transition/'+ dist +'scripts',
            'module-devices'          : path + '/module-devices/'+ dist +'scripts',
            'module-enrollment'       : path + '/module-enrollment/'+ dist +'scripts',
            'module-behaviors'        : path + '/module-behaviors/'+ dist +'scripts',
            'module-addressbook'      : path + '/module-addressbook/'+ dist +'scripts',

            // requirejs-plugins
            'async'                   : [ path + '/requirejs-plugins/src/async'],
            'goog'                    : [ path + '/requirejs-plugins/src/goog']

        },
        // Register packages
        packages: [
            'base',
            'core',
            'ui',
            'mock',

            'module-currencies',
            'module-accounts',
            'module-automation',
            'module-estatements',
            'module-payments',
            'module-users',
            'module-wealth',
            'module-freshness',
            'module-tags',
            'module-charts',
            'module-badges',
            'module-expenses',
            'module-places',
            'module-ebilling',
            'module-transactions',
            'module-contacts',
            'module-spring-transition',
            'module-devices',
            'module-enrollment',
            'module-behaviors',
            'module-addressbook'
        ],
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-resource': {
                deps: ['angular']
            },
            'angular-translate': {
                deps: ['angular']
            },
            'd3': {
                exports: 'd3'
            },
            "r2d3" : { deps: ["aight"], exports : "d3" },
            'angular-dynamic-locale': {
                deps: ['angular']
            }
        },
        map: {
            '*': {
                'd3': (function resolveD3Dependency() {
                    return isOldIE() ? 'r2d3' : 'd3';
                })()
            }
        }
    };

    // helpers

    // Returns version of IE as a number works for IE version [7, 11)
    function getInternetExplorerVersion() {
        var rv = -1;
        if (navigator && navigator.appName == 'Microsoft Internet Explorer') {
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(navigator.userAgent || "") != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    }

    // returns true on IE versions up to 8
    function isOldIE() {
        var ieVersion = getInternetExplorerVersion();
        return ieVersion > 0 && ieVersion <= 8;
    }

    // shim libraries loaded as <script> tag
    if(root.jQuery) {
        requirejs.undef('jquery');
        define('jquery', function() { return root.jQuery });
    }
    if(root.angular) {
        requirejs.undef('angular');
        define('angular', function() { return root.angular });
    }

    if(root.d3) {
        requirejs.undef('d3');
        requirejs.undef('r2d3');
        define('r2d3', function() { return root.d3 });
        define('d3', function() { return root.d3 });
    }

    return config;
}));
