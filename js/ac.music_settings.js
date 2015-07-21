// Generated by CoffeeScript 1.9.3

/**
 * @package   CleverStyle Music
 * @category  app
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2014-2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */

(function() {
  cs.music_settings = (function() {
    var fn, i, len, option, public_settings, ref, settings;
    settings = localStorage.settings;
    settings = settings ? JSON.parse(settings) : {
      repeat: 'all',
      shuffle: false,
      equalizer_gain_levels: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      reverb_mode: '',
      low_performance: null
    };
    public_settings = {};
    ref = ['repeat', 'shuffle', 'equalizer_gain_levels', 'reverb_mode', 'low_performance'];
    fn = function(option) {
      return Object.defineProperty(public_settings, option, {
        get: function() {
          return settings[option];
        },
        set: function(value) {
          settings[option] = value;
          return localStorage.settings = JSON.stringify(settings);
        }
      });
    };
    for (i = 0, len = ref.length; i < len; i++) {
      option = ref[i];
      fn(option);
    }
    if (public_settings.low_performance === null) {
      document.webL10n.ready(function() {
        //public_settings.low_performance = confirm(_('low-performance-mode-details'));
        confirm(_('low-performance-mode-details'));
        public_settings.low_performance = true;
        return location.reload();
      });
    }
    if (public_settings.low_performance) {
      $(function() {
        return $('body').addClass('low-performance');
      });
    }
    return public_settings;
  })();

}).call(this);
