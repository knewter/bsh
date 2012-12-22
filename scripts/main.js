// Require.js allows us to configure shortcut alias
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: [
        'underscore',
        'jquery'
      ],
    exports: 'Backbone'
    }
  },
  paths: {
    jquery     : './lib/jquery',
    underscore : './lib/underscore',
    backbone   : './lib/backbone',
    text       : './lib/text',
    ace        : './lib/ace/ace',
  }
});

require([
  './views/commandline',
], function(CommandLine) {
  new CommandLine();
});
