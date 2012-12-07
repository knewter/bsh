define([
    'jquery',
    'underscore',
    'backbone',
    '../views/prompt'
], function($, _, Backbone, Prompt) {

  return Backbone.View.extend({

    el: '#stdin',

    initialize: function() {
      this.traversalPointer = this.traversalPointer || this.history[this.history - 1];
      this.historyRefPointer = -1;
      this.prompt = new Prompt;
    },

    events: {
      'keydown' : 'handleKeys',
      'focusout' : 'loseFocus',
      'focus'    : 'gainFocus'
    },

    gainFocus: function() {
      this.prompt.gainFocus();
    },

    loseFocus: function() {
      this.prompt.loseFocus();
      if (this.el.value === '') {
        this.el.value = 'Currently out of focus';
      }
    },

    handleKeys: function(e) {
      // console.log(e.keyCode);
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
      // working on this one
      ls : function() {},
      // typical gnu apps
      'cat'     : function(){}, 'cd'      : function(){},
      'cp'      : function(){}, 'find'    : function(){},
      'history' : function(){}, 'less'    : function(){},
      'ls'      : function(){}, 'mkdir'   : function(){},
      'mv'      : function(){}, 'pwd'     : function(){},
      'rm'      : function(){}, 'rmdir'   : function(){},
      // typical cli apps
      'curl'    : function(){}, 'git'     : function(){},
      'node'    : function(){}, 'ssh'     : function(){}, 
      'tmux'    : function(){}, 'vim'     : function(){},
       // web apps
      'chat'    : function(){}, 'email'   : function(){}, 
      'search'  : function(){}, 'wiki'    : function(){},
      // other
      'feh'     : function(){}, 'mplayer' : function(){}
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
