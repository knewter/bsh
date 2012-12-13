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

    evaluate: function(input) {
      //used later
      this.input = input;
      //clear the line to make me feel like something is happening
      this.el.value = '';
      // push to history
      this.history.push(input);
      // Update pointer to end of the list
      this.historyRefPointer = this.history.length;
      this.tokenize(input);
      this.checkForValidCommand(input);
    },

    tokenize: function(input) {
      if (input && input.trim()) {
        var tokens = input.split(' ').filter(function(val, i) {
          return val;
        });
        this.cmd  = tokens[0];
        console.log("this.cmd: ", this.cmd);
        this.args = tokens.splice(1);
        console.log("this.args: ", this.args);
      };
    },

    checkForValidCommand: function(input) {
      if (this.commands[this.cmd]) {
        this.commands[this.cmd].call(this)
      }
    },

    history : [],

    commands: {
      // working on this one
      pwd: function() {
        // debugger;
        STDOUT.setOutput(window.cwd.fullPath)
      },

      mkdir: function() {
        // the following commented code is for handling flags
        // not bothering with it right now
        // var dashP = false;
        // var index = this.args.indexOf('-p');
        // if (index != -1) {
        //   this.args.splice(index, 1);
        //   dashP = true;
        // }

        // if (!this.args.length) {
        //   output('usage: ' + this.cmd + ' [-p] directory<br>');
        // }

        // Create each directory passed as an argument.
        this.args.forEach(function(dirName, i) {
          // if (dashP) {
          var folders = dirName.split('/');

          // Throw out './' or '/' if present on the beginning of our path.
          if (folders[0] == '.' || folders[0] == '') {
            folders = folders.slice(1);
          }
          this.createDir(window.cwd, folders);
          // } 
          // else {
          //   window.cwd.getDirectory(dirName, {create: true, exclusive: true},function(){},function(e) { 
          //     this.invalidOpForEntryType(e, this.cmd, dirName); 
          //   });
          // }
        });
      },

      //mkdir and ls are a bit more difficult than i originally thought...
      // moving onto MOAR FEATURES!


      curl: function() {
        var url = this.args[0];
          var getUrl = function(url) {
            $.ajax({
              type  : "GET",
              url   : url,
              error: function(err){console.log('errraaarrr: ', err)},
              success: function(data){
                console.log("data: ", data);
                window.data = data;
              }
            });
          };
          getUrl.call(this, url);
        }

    },

      // gnu cli apps
      // TODO: 'cat'
      // TODO: 'cd'
      // TODO: 'cp'
      // TODO: 'find'
      // TODO: 'history'
      // TODO: 'less'
      // TODO: 'ls'
      // TODO: 'mkdir'
      // TODO: 'mv'
      // DONE: 'pwd'
      // TODO: 'rm'
      // TODO: 'rmdir'

      // other cli apps
      // TODO: 'curl'
      // TODO: 'feh'
      // TODO: 'git'
      // TODO: 'mplayer'
      // TODO: 'node'
      // TODO: 'ssh'
      // TODO: 'tmux'
      // TODO: 'vim'

      // web apps
      // TODO: 'chat'
      // TODO: 'email'
      // TODO: 'search'
      // TODO: 'wiki'

    createDir: function(rootDirEntry, folders, optionalErrorCallback) {
      var errorCallback = optionalErrorCallback || this.errorHandler;

      rootDirEntry.getDirectory(folders[0], {create: true}, function(dirEntry) {

        // Recursively add the new subfolder if we still have a subfolder to create.
        if (folders.length) {
          this.createDir(dirEntry, folders.slice(1));
        }
      }, errorCallback);
    },

    errorHandler: function(e) {
      //something like this
      if ("FileError." + this.possibleFileErrors[e.code]) {
        console.log("Error: ", this.possibleFileErrors[e.code])
      }
    },

    possibleFileErrors: {
      QUOTA_EXCEEDED_ERR       : 'QUOTA_EXCEEDED_ERR'       ,
      NOT_FOUND_ERR            : 'NOT_FOUND_ERR'            ,
      SECURITY_ERR             : 'SECURITY_ERR'             ,
      INVALID_MODIFICATION_ERR : 'INVALID_MODIFICATION_ERR' ,
      INVALID_STATE_ERR        : 'INVALID_STATE_ERR'        ,
      unknown                            : 'Unknown Error'            ,
    },


    invalidOpForEntryType: function(e, cmd, dest) {
      if (e.code == FileError.NOT_FOUND_ERR) {
        output(this.cmd + ': ' + dest + ': No such file or directory<br>');
      } else if (e.code == FileError.INVALID_STATE_ERR) {
        output(this.cmd + ': ' + dest + ': Not a directory<br>');
      } else if (e.code == FileError.INVALID_MODIFICATION_ERR) {
        output(this.cmd + ': ' + dest + ': File already exists<br>');
      } else {
        this.errorHandler(e);
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
