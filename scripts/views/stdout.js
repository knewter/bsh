define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone) {

  return Backbone.View.extend({

    el: '#stdout',

    initialize: function() {
    },
      
    events: {
    },
    
    setOutput: function(msg) {
      this.$el.text(msg).fadeIn(2000);
      // this.$el.css('background-color', "rgba(0, 0, 0, 0.17)");
    }
  });
});
