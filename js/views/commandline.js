define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

  return Backbone.View.extend({

    el: '#cli',

    initialize: function() {
      // console.log(1);
      this.traversalPointer = this.traversalPointer || this.history[this.history - 1];
    },

    events: {
      'click'   : 'doStuff',
      'keydown' : 'handleKeys'
    },

    doStuff: function() {
      alert('omg omg omg');
    },

    handleKeys: function(e) {
      // console.log(e.keyCode);
      var code = parseInt(e.keyCode, 10);
      if (this.navKeys[code]) {
          this.navKeys[code].call(this);
        }

    },

    navKeys: {
       9: function() {}, // tab
      13: function() {this.history.push(this.el.value)}, // enter
      38: function() {this.displayHistory(-1)}, // up
      39: function() {}, // right
      40: function() {this.displayHistory(1)}, // down
      37: function() {}, // left
    },

    history : [],


    displayHistory: function (sign) {

    }
  });

});
