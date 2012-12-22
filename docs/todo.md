most of this came from a few weeks ago and it needs editing and to conform to some styling rules
some js testing framework:
 - qunit + sinon (diff mocks of sinon and mock4js)
 - maybe buster later

- allow for authentification and maintaining of a session with external server
- the external server should:
  - listen for certain requests and return appropriate responses, get requests for now
  - automatic storing of user data
  - update the extension as necessary
  - fetch sites on request
    - curl -O http://twitter.com should trigger a fetch on the server side and a serving of the result back to the extension
- check the input while user is typing
- piping
- cli apps

Currently possible:
  - history traversal
  - displaying history
  - pwd
  - ls
  - mkdir
  - touch 
  - clear

next: 
  - cd
  - vim
  - org-mode
  - irc client
  - transparent console displaying cool stuff in the background
    - possible charts:
      - how many hours you spend in a console
      - a chart of how many posts are on r/javascript
      - a chart of how many new posts reference js/node on hackernews and/or twitter
      - a chart of sites visited by tags
      - a chart comparing site visits versus git commits
      - a chart of 'how many steps taken'
      - software dev time
    - be able to overlay charts easily
    - goals met
    - productivity: 0 - 100 (speedometer thingy)
    - coffee status
    - a list of sites visited
    - most visited sites
    - your savings, checkings
    - money spent and where
    - todo list
    - calendar
    - estimated calories burned
    - trips to different locations
    - how many miles you travel daily, via walking and driving (fitbit)
    - your friend graph
    - phone calls
    - text messages
    - sleep time (wakemate)
    - possible relevant posts
    - time spent in front of computer
    - read/unread emails, @messages, time spent in irc
    - general trends on the internet
    - activity nearby via geo-APIs on foursquare, twitter
  - notifications somehow...
  - send money via paypal
    - paypal $100 to dwilkins@
  - autocomplete
  
"You've moved 22 miles on Friday, which is greater than your average of 15 miles."
"your weekend has been busier than usual"
"You sent and received 95 text messages on Friday"
"You've spoken with 3 more people than average today"
"you've interacted with 22% more people yesterday."

  - translator
voice instructions
  - record audio continually
  - press key to talk
  - analyze when you were directing speech to the computer
  - this is going to use a lot of space, this is when a volunteer computing network would be handy
  - "what  is ..." (wikipedia, dictionary)
  - "where is ..." (osm search)
  - "send an email to.."
  - "text message Person..."
  - "find pizza nearby..."
- check the input while user is typing
- piping
- cli apps
- plug into a volunteer computing platform..maybe
