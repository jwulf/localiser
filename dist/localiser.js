/**
 * A Localiser takes a JSON-object of localised strings in its constructor.
 * The Localiser.localise(id, locale?) method returns the appropriate localised string.
 * A configuration object is optional.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_STRING_ID = "_default";
var DEFAULT_NO_STRING_ID = "404";
var DEFAULT_LOCALE = "en_US";
var DEFAULT_BORKED = "Error: String not found";

var Localiser = function () {
    function Localiser(strings, config) {
        _classCallCheck(this, Localiser);

        config = config || {};
        this.defaultStringId = config.defaultStringId || DEFAULT_STRING_ID;
        this.noStringId = config.noStringId || DEFAULT_NO_STRING_ID;
        this.defaultLocale = config.defaultLocale || DEFAULT_LOCALE;
        this.b0rked = config.b0rked || DEFAULT_BORKED;
        this.strings = {};
        if (strings) this.loadLocale(strings);
    }

    /**
     * Takes an optional storypoint and an optional locale.
     * Returns a storypoint in the requested locale if one exists.
     * If one does not, returns the storypoint in the default locale, if one exists.
     * If one does not, returns the 404 storypoint in the requested locale, if one exists.
     * If one does not, returns the 404 storypoint in the default locale, if one exists.
     * If one does not, returns the b0rked error object.
     */


    _createClass(Localiser, [{
        key: "getLocalisedString",
        value: function getLocalisedString(stringId, locale, n) {
            if (!n) n = 0;
            if (n === 2) return this.b0rked; // recursion depth-detection for the case where there is no 404 storypoint at all.
            if (this.strings[stringId] && this.strings[stringId][locale]) return this.strings[stringId][locale]; // return a localised storypoint if there is one
            if (this.strings[stringId] && this.strings[stringId][this.defaultLocale]) return this.strings[stringId][this.defaultLocale]; // return the default locale storypoint if there is one
            return this.getLocalisedString(this.noStringId, locale, n + 1); // recurse for a localised 404 storypoint
        }
    }, {
        key: "localise",
        value: function localise(stringId, locale) {
            // if no locale is specified, use the defaultLocale
            var requestedLocale = locale || this.defaultLocale;
            // If no string is requested, then return a localised version of the default storypoint
            if (!stringId) {
                return this.getLocalisedString(this.defaultStringId, requestedLocale);
            } else {
                // otherwise, return a localised version of the requested storypoint
                return this.getLocalisedString(stringId, requestedLocale);
            }
        }
    }, {
        key: "loadLocale",
        value: function loadLocale(strings) {
            var locale;
            if (this.strings.length = 0 && (!strings._meta || !strings._meta.locale)) {
                locale = this.defaultLocale;
            } else {
                locale = strings._meta.locale;
            }
            var keys = Object.keys(strings);
            for (var i = 0; i < keys.length; i++) {
                var n = keys[i];
                if (!this.strings[n]) this.strings[n] = {};
                this.strings[n][locale] = strings[n];
            }
        }
    }]);

    return Localiser;
}();

module.exports = Localiser;

