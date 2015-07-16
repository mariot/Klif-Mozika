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
    var music_library, music_playlist, music_settings, player, scroll_interval;
    music_library = cs.music_library;
    music_playlist = cs.music_playlist;
    music_settings = cs.music_settings;
    player = document.querySelector('cs-music-player');
    scroll_interval = 0;
    return Polymer('cs-music-playlist', {
      list: [],
      created: function() {
        return cs.bus.on('player/play', (function(_this) {
          return function(id) {
            if (_this.list.length) {
              return _this.update_status(id);
            }
          };
        })(this));
      },
      ready: function() {
        switch (music_settings.repeat) {
          case 'none':
            this.shadowRoot.querySelector('[icon=repeat]').setAttribute('disabled', '');
            break;
          case 'one':
            this.shadowRoot.querySelector('[icon=repeat]').innerHTML = 1;
        }
        if (!music_settings.shuffle) {
          return this.shadowRoot.querySelector('[icon=random]').setAttribute('disabled', '');
        }
      },
      showChanged: function() {
        if (this.show) {
          return this.update();
        }
      },
      update: function() {
        return music_playlist.current((function(_this) {
          return function(current_id) {
            return music_playlist.get_all(function(all) {
              var count, get_next_item, index, list;
              index = 0;
              list = [];
              count = all.length;
              get_next_item = function() {
                if (index < count) {
                  return music_library.get_meta(all[index], function(data) {
                    data.playing = data.id === current_id ? 'yes' : 'no';
                    data.icon = cs.bus.state.player === 'playing' ? 'play' : 'pause';
                    data.artist_title = [];
                    if (data.artist) {
                      data.artist_title.push(data.artist);
                    }
                    if (data.title) {
                      data.artist_title.push(data.title);
                    }
                    data.artist_title = data.artist_title.join(' — ') || _('unknown');
                    list.push(data);
                    data = null;
                    ++index;
                    return get_next_item();
                  });
                } else if (_this.show) {
                  _this.list = list;
                  return scroll_interval = setInterval((function() {
                    var item, items_container;
                    items_container = _this.shadowRoot.querySelector('cs-music-playlist-items');
                    if (items_container) {
                      item = items_container.querySelector('cs-music-playlist-item[playing=yes]');
                      clearInterval(scroll_interval);
                      scroll_interval = 0;
                      return items_container.scrollTop = item.offsetTop;
                    }
                  }), 100);
                }
              };
              return get_next_item();
            });
          };
        })(this));
      },
      play: function(e) {
        return music_playlist.current((function(_this) {
          return function(old_id) {
            music_playlist.set_current(e.target.dataset.index);
            return music_playlist.current(function(id) {
              if (id !== old_id) {
                player.play(id);
                return _this.update_status(id);
              } else {
                player.play();
                return _this.update_status(id);
              }
            });
          };
        })(this));
      },
      update_status: function(new_id) {
        return this.list.forEach((function(_this) {
          return function(data, index) {
            if (data.id === new_id) {
              _this.list[index].playing = 'yes';
              return _this.list[index].icon = cs.bus.state.player === 'playing' ? 'play' : 'pause';
            } else {
              _this.list[index].playing = 'no';
              return delete _this.list[index].icon;
            }
          };
        })(this));
      },
      back: function() {
        var items_container;
        this.go_back_screen();
        items_container = this.shadowRoot.querySelector('cs-music-playlist-items');
        if (items_container) {
          items_container.style.opacity = 0;
        }
        return setTimeout(((function(_this) {
          return function() {
            _this.list = [];
            if (scroll_interval) {
              clearInterval(scroll_interval);
              return scroll_interval = 0;
            }
          };
        })(this)), 300);
      },
      repeat: function(e) {
        var control;
        control = e.target;
        music_settings.repeat = (function() {
          switch (music_settings.repeat) {
            case 'none':
              return 'all';
            case 'all':
              return 'one';
            case 'one':
              return 'none';
          }
        })();
        if (music_settings.repeat === 'none') {
          control.setAttribute('disabled', '');
        } else {
          control.removeAttribute('disabled');
        }
        return control.innerHTML = music_settings.repeat === 'one' ? 1 : '';
      },
      shuffle: function(e) {
        var control;
        control = e.target;
        music_settings.shuffle = !music_settings.shuffle;
        if (!music_settings.shuffle) {
          control.setAttribute('disabled', '');
        } else {
          control.removeAttribute('disabled');
        }
        this.list = [];
        return music_playlist.current((function(_this) {
          return function(id) {
            return music_playlist.refresh(function() {
              music_playlist.set_current_id(id);
              return _this.update();
            });
          };
        })(this));
      }
    });
  });

}).call(this);
