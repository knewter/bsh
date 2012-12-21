Bsh is a web browser interface and an environment which provides a command interpreter with 
common utilities for supporting operations on local devices and hypermedia information systems.

This project adheres to the Semantic Versioning 2.0.0-rc.1 rules described at: 
  http://semver.org/

## Requirements
  As of v0.01, the only browser supported is Chromium.

## TODO:
  README: 

    - List and describe the major components of the system in the readme
    - The shell language and commands themselves all need better descriptons
    - a description of the local filesystem api and its available options
    - network operations via the proxy
    - API for data transference
    - DSL for shell scripting
    - coding standards, idiomatic.js, gnu?
    - Contributing to the project and maintaining conformance to coding standards
    - any other incomplete sections

  Shell:

    - provide an interface for working with system hardware
      http://developer.chrome.com/apps/app_hardware.html
    - utilities needing an implementation:
      - ast, a basic text version initially
      - cflow, rendered in either two or three dimensions
      - ssh, remotely working with pty.js on the proxy
      - cal, chat, clear, curl, email, feh, find, git, jstags, jsxref, less, mkdir, mon
      - mplayer, mv, ps, rm, rmdir, search, tmux, vim, wiki

## Shell utilities
  Bsh supports common utilities found in most POSIX/Linux compliant systems. The below list is
  only a representative sample of the available commands and these descriptions aren't entirely
  accurate. A description of available options is needed.

  ast:

    an interface for accessing the shell's generated abstract syntax tree

  bflags:
    
    flags the browser is using
    "-c" compile flags
    "--v8" v8 flags

  cflow:
    
    a control flow diagram rendered in either two or three dimensions

  cal:
    
    a calendaring application or a call to a website API for fetching either vCal or iCal data

  cat:
 
    print the contents of a file

  cd:
 
    change the current working directory

  clear
 
    clear the contents of the command line

  curl
 
    an implmentation of cURL (http://curl.haxx.se/)for bsh

  git:
 
    a modified version of https://github.com/danlucraft/git.js 

  history:
 
    a utility for retrieving and manipulating previously issued commands

  jstags
 
    generates an index of JS objects found in JS source files

  jsxref
 
    automatic generation of documentation and cross references for JS aplications

  ls
 
    list contents of a directory

  mon
 
    monitor system and network resources
    "--nu" network usage
    "--gpu" gpu usage

  
## Proxies for getting around Single Origin Policy
  Bsh's network operations are strictly confined to sites listed in the manifest file. Better description to come...

## API

## DSL
  Standard input is parsed using a modified version of the recursive descent parser, acorn.js. 
  ### Special Characters
  ### Default Environment Variables

## Directory Structure and Devices

## Control character conventions
    input:
    operation:

## Processes and job control without resorting to the browser's tab manager

## Terminal remote access

<pre>
            ___
        .-"; ! ;"-.
      .'!  : | :  !`.
     /\  ! : ! : !  /\
    /\ |  ! :|: !  | /\
   (  \ \ ; :!: ; / /  )
  ( `. \ | !:|:! | / .' )
  (`. \ \ \!:|:!/ / / .')
   \ `.`.\ |!|! |/,'.' /
    `._`.\\\!!!// .'_.'
       `.`.\\|//.'.'
        |`._`n'_.'|  kitchen sink to follow...
        "----^----"
</pre>
