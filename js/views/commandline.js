define([
    'jquery',
    'underscore',
    'backbone',
    '../views/prompt',
    '../views/stdout'
], function($, _, Backbone, Prompt, StandardOutput) {

  return Backbone.View.extend({

    el: '#stdin',

    initialize: function() {
      STDOUT      = new StandardOutput()
      this.prompt = new Prompt;

      this.traversalPointer  = this.traversalPointer || this.history[this.history - 1];
      this.historyRefPointer = -1;
      this.outOfFocusMessage = 'Currently out of focus';

      // Create the file system
      var storageType       = window.PERSISTENT,
          storageSize       = Infinity;
      window.requestFileSystem = window.webkitRequestFileSystem;
      window.requestFileSystem(storageType, storageSize, function(fileSystem) {
        this.fs   = fileSystem,
        this.cwd  = fs.root,
        this.type = storageType,
        this.size = storageSize;
        // debugger;
      });
    },
      
    events: {
      'keydown'   : 'handleKeys',
      'focusout'  : 'loseFocus' ,
      'focusin'   : 'gainFocus' ,
      'focus'     : 'gainFocus'
    },

    gainFocus: function() {
      this.prompt.gainFocus();
      if ((this.el.value === '') || (this.el.value === this.outOfFocusMessage)) {
        this.el.value = '';
      }
    },

    loseFocus: function() {
      this.prompt.loseFocus();
      if (this.el.value === '') {
        this.el.value = this.outOfFocusMessage;
      }
    },

    handleKeys: function(e) {
      // if (e.keyCode == 27) { // Esc
      //   toggleHelp();
      //   e.stopPropagation();
      //   e.preventDefault();
      // }

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
      cwd: function() {STDOUT.setOutput(window.cwd.fullPath)},
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
