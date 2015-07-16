// Generated by CoffeeScript 1.9.3

/**
 * @package   CleverStyle Music
 * @category  Web Components
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2014-2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */

(function() {
  document.webL10n.ready(function() {
    var mode, modes, sound_processing;
    sound_processing = cs.sound_processing;
    modes = {};
    modes[_('reset')] = '';
    (function() {
      var i, len, loaded_modes, mode, results;
      loaded_modes = sound_processing.get_reverb_modes();
      results = [];
      for (i = 0, len = loaded_modes.length; i < len; i++) {
        mode = loaded_modes[i];
        results.push(modes[mode] = mode);
      }
      return results;
    })();
    return Polymer('cs-music-sound-environment', {
      current_mode: sound_processing.get_reverb_mode(),
      modes: (function() {
        var results;
        results = [];
        for (mode in modes) {
          results.push(mode);
        }
        return results;
      })(),
      update_mode: function(e) {
        this.current_mode = $(e.target).data('mode');
        return sound_processing.set_reverb_mode(modes[this.current_mode]);
      },
      back: function() {
        return this.go_back_screen();
      }
    });
  });

}).call(this);
