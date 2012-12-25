define([
    'jquery',
    'underscore',
    'backbone',
    'ace',
    '../lib/ace/keybinding-vim'
], function($, _, Backbone) {

  return Backbone.View.extend({

    el: 'terminal',

    initialize: function() {
      $('.terminal').append('<div id="editor"></div>');
      this.render();
    },

    render: function() {
      var editor = ace.edit("editor");
      editor.setTheme("ace/theme/monokai");
      editor.getSession().setMode("ace/mode/javascript");
      require(['ace/keyboard/vim'], function(vimMode){
        editor.setKeyboardHandler(vimMode.handler);
      });

      return this;
    },

    events: {
    },
   
  });
});
