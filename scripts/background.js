chrome.browserAction.onClicked.addListener(function() {

  // alert('onClicked.addListener anonymous function called');
  chrome.tabs.create({
    'url': 'background.html'
  });
});
