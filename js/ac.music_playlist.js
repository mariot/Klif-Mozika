// Generated by CoffeeScript 1.4.0

/**
 * @package     CleverStyle Music
 * @category    app
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
*/


(function() {

  (function() {
    var music_library;
    music_library = cs.music_library;
    return cs.music_playlist = {
      get_all: function(callback) {
        var playlist;
        callback = (callback || function() {}).bind(this);
        playlist = localStorage.getItem('playlist');
        if (playlist) {
          playlist = JSON.parse(playlist);
          if (playlist != null ? playlist.length : void 0) {
            callback(playlist);
            return;
          }
        }
        return this.refresh(function() {
          return this.get_all(callback);
        });
      },
      current: function(callback) {
        var playlist, position;
        callback = (callback || function() {}).bind(this);
        playlist = localStorage.getItem('playlist');
        if (playlist) {
          playlist = JSON.parse(playlist);
          if (playlist != null ? playlist.length : void 0) {
            position = localStorage.getItem('position') || 0;
            if (position < playlist.length) {
              localStorage.setItem('position', position);
              callback(playlist[position]);
              return;
            }
          }
        }
        this.refresh(function() {
          return this.next(callback);
        });
      },
      set_current: function(position) {
        return localStorage.setItem('position', position);
      },
      prev: function(callback) {
        var playlist, position;
        callback = (callback || function() {}).bind(this);
        playlist = localStorage.getItem('playlist');
        if (playlist) {
          playlist = JSON.parse(playlist);
          if (playlist != null ? playlist.length : void 0) {
            position = localStorage.getItem('position') || -1;
            if (position > 0) {
              --position;
              localStorage.setItem('position', position);
              callback(playlist[position]);
            }
          }
        }
      },
      next: function(callback) {
        var playlist, position;
        callback = (callback || function() {}).bind(this);
        playlist = localStorage.getItem('playlist');
        if (playlist) {
          playlist = JSON.parse(playlist);
          if (playlist != null ? playlist.length : void 0) {
            position = localStorage.getItem('position') || -1;
            if (position < (playlist.length - 1)) {
              ++position;
              localStorage.setItem('position', position);
              callback(playlist[position]);
              return;
            }
          }
        }
        this.refresh(function() {
          return this.next(callback);
        });
      },
      refresh: function(callback) {
        callback = (callback || function() {}).bind(this);
        music_library.get_all(function(all) {
          var playlist;
          if (all.length) {
            playlist = [];
            all.forEach(function(data) {
              return playlist.push(data.id);
            });
            playlist.shuffle();
            localStorage.setItem('playlist', JSON.stringify(playlist));
            localStorage.removeItem('position');
            return callback(playlist);
          } else {
            if (confirm(_('library-empty-want-to-rescan'))) {
              $(document.body).addClass('library-rescan');
              return document.querySelector('cs-music-library-rescan').open();
            }
          }
        });
      }
    };
  })();

}).call(this);
