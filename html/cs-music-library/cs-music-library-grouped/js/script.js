// Generated by CoffeeScript 1.4.0

/**
 * @package     CleverStyle Music
 * @category    Web Components
 * @author      Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright   Copyright (c) 2014, Nazar Mokrynskyi
 * @license     MIT License, see license.txt
*/


(function() {

  document.webL10n.ready(function() {
    var $body, music_library, music_library_action, stop;
    $body = $('body');
    music_library = cs.music_library;
    stop = false;
    music_library_action = document.querySelector('cs-music-library-action');
    return Polymer('cs-music-library-grouped', {
      list: [],
      grouped_field: '',
      open: function(group_field, all) {
        var count, get_next_item, index, list, _unknown,
          _this = this;
        $body.addClass('library-grouped');
        this.grouped_field = group_field;
        stop = false;
        index = 0;
        list = {};
        count = all.length;
        _unknown = _('unknown');
        get_next_item = function() {
          var final_list, key, unknown, value;
          if (index < count) {
            return music_library.get_meta(all[index], function(data) {
              var lowercase_property, property;
              property = data[group_field];
              if (!property) {
                property = _unknown;
                lowercase_property = _unknown;
              } else {
                lowercase_property = new String(property).toLowerCase();
              }
              if (!list[lowercase_property]) {
                list[lowercase_property] = {
                  property: property,
                  ids: [data.id]
                };
              } else {
                list[lowercase_property].ids.push(data.id);
              }
              data = null;
              ++index;
              return get_next_item();
            });
          } else if (!stop) {
            final_list = [];
            unknown = list[_unknown];
            delete list[_unknown];
            for (key in list) {
              value = list[key];
              final_list.push({
                field: group_field,
                value: value.property,
                items: JSON.stringify(value.ids),
                count: value.ids.length
              });
            }
            if (unknown) {
              final_list.push({
                field: group_field,
                value: _unknown,
                items: JSON.stringify(unknown.ids),
                count: unknown.ids.length
              });
            }
            final_list.sort(function(a, b) {
              a = a.value;
              b = b.value;
              if (a === b) {
                return 0;
              } else if (a < b) {
                return -1;
              } else {
                return 1;
              }
            });
            return _this.list = final_list;
          }
        };
        return get_next_item();
      },
      choose_action: function(e) {
        var target;
        target = e.target;
        if (target.tagName === 'SPAN') {
          target = target.parentNode;
        }
        return music_library_action.open(JSON.parse(target.dataset.items));
      },
      back: function() {
        $body.removeClass('library-grouped');
        this.list = [];
        return stop = true;
      }
    });
  });

}).call(this);