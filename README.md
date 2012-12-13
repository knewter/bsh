"content scripts run in the context of a web page and not the extension"
source: http://code.google.com/chrome/extensions/messaging.html

So how to load the extension? 
We need to have the background.html page continually open for the user to participate, 
so the extension needs to specify in the chrome preferences that the previous session
loads each time the browser starts, and it needs to make sure that it is loaded before 
the user closes the browswer.
