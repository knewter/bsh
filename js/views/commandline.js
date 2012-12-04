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
      this.historyRefPointer = -1;
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
      //clear the line to make me feel like something is happening
      this.el.value = '';
      // push to history
      this.history.push(input);
      // Update pointer to end of the list
      this.historyRefPointer = this.history.length;
      // check to see if this is a valid command
      this.checkForValidCommand(input);
    },

    checkForValidCommand: function(input) {
      if (this.commands[input]) {
        this.commands[input].call(this)
      }
    },

    displayHistory: function (sign) {
      this.historyRefPointer = this.historyRefPointer + sign;

      // Can't traverse history if there is none
      if(this.history.length == 0){
        return false;
      }

      // Can't go earlier in the history than exists
      if(this.historyRefPointer < 0){
        this.historyRefPointer = 0;
      }

      // Can go at most to the end of the history list
      if(this.historyRefPointer > this.history.length) {
        this.historyRefPointer = this.history.length;
      }

      if (this.historyRefPointer < this.history.length) {
        this.el.value = this.history[this.historyRefPointer];
      } else {
        this.el.value = '';
      }
    }
  });

});
