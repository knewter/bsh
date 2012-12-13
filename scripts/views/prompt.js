define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

  return Backbone.View.extend({

    el: '#prompt',
    // template: '',

    initialize: function() {
    },

    events: {
    },
   
    loseFocus: function(){
      // debugger;
      this.$el.addClass('no-focus');
    },

    gainFocus: function(){
      // debugger;
      this.$el.removeClass('no-focus');
    },
  });
});
