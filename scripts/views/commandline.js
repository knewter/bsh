define([
    'jquery',
    'underscore',
    'backbone',
    '../views/prompt',
    '../views/stdout',
    '../views/vim'
], function($, _, Backbone, Prompt, StandardOutput, Vim) {

  return Backbone.View.extend({

    el: '#stdin',

    initialize: function() {
      STDOUT      = new StandardOutput()
      this.prompt = new Prompt;

      this.traversalPointer  = this.traversalPointer || this.history[this.history - 1];
      this.historyRefPointer = -1;
      this.outOfFocusMessage = 'Currently out of focus';

      // Create the file system
      var storageType = window.PERSISTENT,
          storageSize = Infinity;
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

      // This needs to be cleaner, so it's commented out for now
      // // this created a file called 'test'
      // cwd.getFile('test', {create: true, exclusive: true}, function(fileEntry) {
      //   fileEntry.createWriter(function(fileWriter) {
      //     fileWriter.write('test');
      //   });
      // })

      // // the following is needed to ls
      // var util = util || {};
      // util.toArray = function(list) {
      //   return Array.prototype.slice.call(list || [], 0);
      // };

      // ls(function(entries) {
      //   if (entries.length) {
      //     var html = formatColumns_(entries);
      //     util.toArray(entries).forEach(function(entry, i) {
      //       html.push(
      //         '<span class="', entry.isDirectory ? 'folder' : 'file',
      //         '">', entry.name, '</span><br>');
      //     });
      //     html.push('</div>');
      //     document.getElementById('stdout').innerHTML = (html.join(''));
      //   }
      // });

      // function ls(successCallback) {
      //   if (!fs) {
      //     return;
      //   }

      //   // Read contents of current working directory. According to spec, need to
      //   // keep calling readEntries() until length of result array is 0. We're
      //   // guarenteed the same entry won't be returned again.
      //   var entries = [];
      //   var reader = cwd.createReader();

      //   var readEntries = function() {
      //     reader.readEntries(function(results) {
      //       console.log('results: ', results);
      //       console.log('entries: ', entries);
      //       if (!results.length) {
      //         console.log(1);

      //         entries = entries.sort();
      //         console.log(entries);
      //         successCallback(entries);
      //       } else {
      //         console.log(2);
      //         entries = entries.concat(util.toArray(results));
      //         console.log(entries);
      //         readEntries();
      //       }
      //     });
      //   };

      //   readEntries();
      // },
      
      // the following is my own personal code,
      // the code above is for touching, and LSing
      pwd: function() {
        // debugger;
        STDOUT.setOutput(window.cwd.fullPath);
      },

      clear: function() {
        STDOUT.setOutput('');
      },

      history: function() {
        STDOUT.setOutput(this.history);
      },

      //FIXME
      mkdir: function() {
        cwd.getDirectory('beepboop', {create: true, exclusive: true});
      },

      //FIXME
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
      },

      vim: function() {
        debugger;
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
      // D: 'pwd'
      // TODO: 'rm'
      // TODO: 'rmdir'
      // TODO: touch

      // other cli apps
      // D: 'curl'
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
