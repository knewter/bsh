define([
    'jquery',
    'underscore',
    'backbone',
    // 'text!templates/vim/main.html',
], function($, _, Backbone) {

  return Backbone.View.extend({

    // template: _.template(vimTemplate),

    initialize: function() {
      console.log('omg omg omg');
    },

    render: function() {
      this.$el.html("<input></input>");
      return this;
    },

    events: {
    },
   
  });
});
