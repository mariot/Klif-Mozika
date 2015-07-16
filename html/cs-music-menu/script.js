// Generated by CoffeeScript 1.9.3

/**
 * @package   CleverStyle Music
 * @category  Web Components
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2014-2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */

(function() {
  var music_settings;

  music_settings = cs.music_settings;

  document.webL10n.ready(function() {
    return Polymer('cs-music-menu', {
      playlist_text: _('playlist'),
      equalizer_text: _('equalizer'),
      sound_environment_text: _('sound-environment'),
      library_text: _('library'),
      rescan_library_text: _('rescan-library'),
      low_performance_mode_text: _('low-performance-mode'),
      low_performance: music_settings.low_performance,
      playlist: function() {
        return this.go_to_screen('playlist');
      },
      equalizer: function() {
        return this.go_to_screen('equalizer');
      },
      sound_environment: function() {
        return this.go_to_screen('sound-environment');
      },
      library: function() {
        return this.go_to_screen('library');
      },
      rescan: function() {
        return this.go_to_screen('library-rescan');
      },
      performance: function() {
        if (music_settings.low_performance !== confirm(_('low-performance-mode-details'))) {
          music_settings.low_performance = !music_settings.low_performance;
          return location.reload();
        }
      },
      back: function() {
        return this.go_to_screen('player');
      }
    });
  });

}).call(this);