define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

  return Backbone.View.extend({

    // template: _.template(vimTemplate),

    el: 'editor',

    initialize: function() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

      console.log('omg omg omg');
    },

    render: function() {
    },

    events: {
    },
   
  });
});
