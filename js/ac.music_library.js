// Generated by CoffeeScript 1.9.3

/**
 * @package   CleverStyle Music
 * @category  app
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2014-2015, Nazar Mokrynskyi
 * @license   MIT License, see license.txt
 */

(function() {
  var db, library_size, music_storage, on_db_ready, request,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (!window.indexedDB) {
    alert("Indexed DB is not supported O_o");
    return;
  }

  db = null;

  on_db_ready = [];

  music_storage = navigator.getDeviceStorage('music');
  //var sdcard = navigator.getDeviceStorage('sdcard');
	var xhr = new XMLHttpRequest({mozSystem: true});
	xhr.open('GET', 'musique/zahayhiboom.mp3', true);
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
		if (xhr.status === 200 && xhr.readyState === 4) {
			videoblob = new Blob([xhr.response], { type: 'audio/mpeg' });
			var request = music_storage.addNamed(videoblob, 'zahayhiboom.mp3');

			request.onsuccess = function () {
				var name = this.result;
				console.log('File "' + name + '" successfully wrote on the sdcard storage area');
			}

			// An error typically occur if a file with the same name already exist
			request.onerror = function () {
				console.log('Unable to write the file: ' + this.error.name);
			}
		}
	};

	xhr.onerror = function () {
		
	};
	xhr.send();
	
	var xhr2 = new XMLHttpRequest({mozSystem: true});
	xhr2.open('GET', 'musique/teuf.mp3', true);
	xhr2.responseType = 'blob';
	xhr2.onreadystatechange = function () {
		if (xhr2.status === 200 && xhr2.readyState === 4) {
			videoblob = new Blob([xhr2.response], { type: 'audio/mpeg' });
			var request = music_storage.addNamed(videoblob, 'teuf.mp3');

			request.onsuccess = function () {
				var name = this.result;
				console.log('File "' + name + '" successfully wrote on the sdcard storage area');
			}

			// An error typically occur if a file with the same name already exist
			request.onerror = function () {
				console.log('Unable to write the file: ' + this.error.name);
			}
		}
	};

	xhr2.onerror = function () {
		
	};
	xhr2.send();
	
	
	var xhr3 = new XMLHttpRequest({mozSystem: true});
	xhr3.open('GET', 'musique/tsikysytomany.mp3', true);
	xhr3.responseType = 'blob';
	xhr3.onreadystatechange = function () {
		if (xhr3.status === 200 && xhr3.readyState === 4) {
			videoblob = new Blob([xhr3.response], { type: 'audio/mpeg' });
			var request = music_storage.addNamed(videoblob, 'tsikysytomany.mp3');

			request.onsuccess = function () {
				var name = this.result;
				console.log('File "' + name + '" successfully wrote on the sdcard storage area');
			}

			// An error typically occur if a file with the same name already exist
			request.onerror = function () {
				console.log('Unable to write the file: ' + this.error.name);
			}
		}
	};

	xhr3.onerror = function () {
		
	};
	xhr3.send();
	
	

  request = indexedDB.open('music_db', 1);

  request.onsuccess = function() {
    var callback;
    db = request.result;
    while (callback = on_db_ready.shift()) {
      callback();
    }
  };

  request.onerror = function(e) {
    console.error(e);
  };

  request.onupgradeneeded = function() {
    var meta_store, music_store;
    db = request.result;
    if (db.objectStoreNames.contains('music')) {
      db.deleteObjectStore('music');
    }
    music_store = db.createObjectStore('music', {
      keyPath: 'id',
      autoIncrement: true
    });
    music_store.createIndex('name', 'name', {
      unique: true
    });
    meta_store = db.createObjectStore('meta', {
      keyPath: 'id'
    });
    meta_store.createIndex('title', 'title');
    meta_store.createIndex('artist', 'artist');
    meta_store.createIndex('album', 'album');
    meta_store.createIndex('genre', 'genre');
    meta_store.createIndex('year', 'year');
    db.transaction.oncomplete = function() {
      var callback, results;
      results = [];
      while (callback = on_db_ready.shift()) {
        results.push(callback());
      }
      return results;
    };
  };

  library_size = -1;

  cs.music_library = {
    add: function(name, callback) {
      callback = (callback || function() {}).bind(this);
      return this.onready(function() {
        var put_transaction;
        put_transaction = db.transaction(['music'], 'readwrite').objectStore('music').put({
          name: name
        });
        put_transaction.onsuccess = callback;
        return put_transaction.onerror = callback;
      });
    },
    parse_metadata: function(name, callback) {
      callback = (callback || function() {}).bind(this);
      return db.transaction(['music']).objectStore('music').index('name').get(name).onsuccess = function() {
        var data;
        if (this.result) {
          data = this.result;
          return music_storage.get(data.name).onsuccess = function() {
            var store;
            if (this.result) {
              store = function(metadata) {
                var store_object;
                store_object = db.transaction(['meta'], 'readwrite').objectStore('meta').put({
                  id: data.id,
                  title: metadata.title || '',
                  artist: metadata.artist || '',
                  album: metadata.album || '',
                  genre: metadata.genre || '',
                  year: metadata.year || metadata.recordingTime || '',
                  rated: metadata.rated || 0
                });
                store_object.onsuccess = function() {
                  return callback();
                };
                return store_object.onerror = function() {
                  return callback();
                };
              };
              return parseAudioMetadata(this.result, function(metadata) {
                return store(metadata);
              }, (function(_this) {
                return function() {
                  var asset, url;
                  url = URL.createObjectURL(_this.result);
                  asset = AV.Asset.fromURL(url);
                  asset.get('metadata', function(metadata) {
                    URL.revokeObjectURL(url);
                    if (!metadata) {
                      callback();
                      return;
                    }
                    return store(metadata);
                  });
                  return asset.on('error', function() {
                    var metadata;
                    metadata = data.name.split('/').pop();
                    metadata = metadata.split('.');
                    metadata.pop();
                    metadata = metadata.join('.');
                    metadata = metadata.split('–', 2);
                    if (metadata.length === 2) {
                      store({
                        artist: $.trim(metadata[0]),
                        title: $.trim(metadata[1])
                      });
                      return;
                    }
                    metadata = metadata[0].split(' - ', 2);
                    if (metadata.length === 2) {
                      store({
                        artist: $.trim(metadata[0]),
                        title: $.trim(metadata[1])
                      });
                      return;
                    }
                    return store({
                      title: $.trim(metadata[0])
                    });
                  });
                };
              })(this));
            }
          };
        }
      };
    },
    get: function(id, callback) {
      callback = (callback || function() {}).bind(this);
      return this.onready(function() {
        return db.transaction(['music']).objectStore('music').get(id).onsuccess = function() {
          var result;
          result = this.result;
          if (result) {
            return callback(result);
          }
        };
      });
    },
    get_meta: function(id, callback) {
      callback = (callback || function() {}).bind(this);
      return this.onready(function() {
        return db.transaction(['meta']).objectStore('meta').get(id).onsuccess = function() {
          var result;
          result = this.result;
          if (result) {
            return callback(result);
          } else {
            return callback({
              id: id
            });
          }
        };
      });
    },
    get_all: function(callback, filter) {
      callback = (callback || function() {}).bind(this);
      filter = filter || function() {
        return true;
      };
      return this.onready(function() {
        var all;
        all = [];
        return db.transaction(['music']).objectStore('music').openCursor().onsuccess = function() {
          var result;
          result = this.result;
          if (result) {
            if (filter(result.value)) {
              all.push(result.value);
            }
            return result["continue"]();
          } else {
            return callback(all);
          }
        };
      });
    },
    del: function(id, callback) {
      return this.onready(function() {
        return db.transaction(['music'], 'readwrite').objectStore('music')["delete"](id).onsuccess = function() {
          return db.transaction(['meta'], 'readwrite').objectStore('meta')["delete"](id).onsuccess = function() {
            return callback();
          };
        };
      });
    },
    size: function(callback, filter) {
      callback = (callback || function() {}).bind(this);
      filter = filter || function() {
        return true;
      };
      return this.onready(function() {
        var calculated_size;
        if (library_size >= 0 && !filter) {
          callback(library_size);
        }
        calculated_size = 0;
        return db.transaction(['music']).objectStore('music').openCursor().onsuccess = function() {
          var result;
          result = this.result;
          if (result) {
            if (!filter || filter(result.value)) {
              ++calculated_size;
            }
            return result["continue"]();
          } else {
            if (!filter) {
              library_size = calculated_size;
            }
            return callback(calculated_size);
          }
        };
      });
    },
    rescan: function(done_callback) {
      var found_files, known_extensions;
      known_extensions = ['mp3'];
      done_callback = (done_callback || function() {}).bind(this);
      found_files = 0;
      return this.onready(function() {
        var new_files, remove_old_files;
        new_files = [];
        remove_old_files = (function(_this) {
          return function() {
            return _this.get_all(function(all) {
              var id_to_remove, remove;
              id_to_remove = [];
              all.forEach(function(file) {
                var ref;
                if (ref = file.name, indexOf.call(new_files, ref) < 0) {
                  id_to_remove.push(file.id);
                }
              });
              remove = function(index) {
                if (id_to_remove[index]) {
                  return _this.del(id_to_remove[index], function() {
                    return remove(index + 1);
                  });
                } else {
                  return done_callback();
                }
              };
              return remove(0);
            });
          };
        })(this);
        (function(_this) {
          return (function() {
            var cursor;
            cursor = music_storage.enumerate();
            cursor.onsuccess = function() {
              var file;
              if (cursor.result) {
                file = cursor.result;
                //console.error(file.name);
                if (known_extensions.indexOf(file.name.split('.').pop()) !== -1 && (file.name === 'tsikysytomany.mp3' || file.name === 'teuf.mp3' || file.name === 'zahayhiboom.mp3')) {
                  return db.transaction(['music']).objectStore('music').index('name').get(file.name).onsuccess = function(e) {
                    if (!e.target.result) {
                      return _this.add(file.name, function() {
                        return this.parse_metadata(file.name, function() {
                          new_files.push(file.name);
                          ++found_files;
                          cs.bus.trigger('library/rescan/found', found_files);
                          return cursor["continue"]();
                        });
                      });
                    } else {
                      new_files.push(file.name);
                      ++found_files;
                      cs.bus.trigger('library/rescan/found', found_files);
                      return cursor["continue"]();
                    }
                  };
                } else {
                  return cursor["continue"]();
                }
              } else {
                if (!new_files.length) {
                  return alert(_('no_files_found'));
                } else {
                  return remove_old_files();
                }
              }
            };
            return cursor.onerror = function() {
              return console.error(this.error.name);
            };
          });
        })(this)();
      });
    },
    onready: function(callback) {
      callback = (callback || function() {}).bind(this);
      if (db) {
        callback();
      } else {
        on_db_ready.push(callback);
      }
    }
  };

}).call(this);
