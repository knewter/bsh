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
      console.log('omg omg omg');
    },

    handleKeys: function(e) {
      console.log(e.keyCode);
      var code = parseInt(e.keyCode, 10);
      if (this.navKeys[code]) {
          this.navKeys[code].call(this);
        }

    },

    navKeys: {
      // 9 : function() {}, // tab
      13 : function() {this.evaluate(this.el.value)}, // enter
      38 : function() {this.displayHistory(-1)}, // up
      40 : function() {this.displayHistory(1)}, // down
    },

    history : [],

    commands: {
      'foo' : function(){console.log('baaaaaaaaar!')}
    },

    evaluate: function(input) {
      // push to history
      this.history.push(input);
      // check to see if this is a valid command
      this.checkForValidCommand(input);
    },

    checkForValidCommand: function(input) {
      if (this.commands[input]) {
        this.commands[input].call(this)
      }
    },

    displayHistory: function (sign) {
      if (this.historyRefPointer) {
        this.historyRefPointer = this.historyRefPointer + sign;
      } else {
        this.historyRefPointer = this.history.length + sign;
      }

      if (this.historyRefPointer + sign < history.length) {
        this.el.value = this.history[this.historyRefPointer];
        console.log("this.history.length: ", this.history.length);
        console.log("this.historyRefPointer: ", this.historyRefPointer);
      }
      window.th = this;
    }
  });

});
