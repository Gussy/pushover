pushover
========

Serve up git repositories over http and accept git pushes.

This library makes it super easy to set up custom git push deploy logic.

this fork
=========

[![build status](https://secure.travis-ci.org/Gussy/pushover.png)](http://travis-ci.org/Gussy/pushover)

This fork aims to be an even more simplified Git-Smart-HTTP server used for
super-fast serving of Git repositories.

example
=======

simple.js
---------

``` js
var pushover = require('pushover');
var repos = pushover(__dirname + '/repos');

repos.on('push', function (repo) {
    console.log('received a push to ' + repo);
});

repos.on('clone', function (repo) {
    console.log('transmitted a clone of ' + repo);
});

repos.listen(7000);
```

then start up the pushover server...

```
$ node example/simple.js 
```

meanwhile...

```
$ git push http://localhost:7000/beep master
Counting objects: 356, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (133/133), done.
Writing objects: 100% (356/356), 46.20 KiB, done.
Total 356 (delta 210), reused 355 (delta 210)
To http://localhost:7000/beep
 * [new branch]      master -> master

```

and then...

```
$ node example/simple.js 
received a push to beep
```

methods
=======

var pushover = require('pushover')

var repos = pushover(repoDir, opts)
-----------------------------------------------------

Create a new repository collection from the directory `repoDir`.
`repoDir` should be entirely empty except for git repo directories.

`repos` is an EventEmitter. Right now it only emits "push" and "clone" events
with the repo name as the only argument.

repos.handle(req, res, next)
----------------------------

Handle incoming HTTP requests with a connect-style middleware.

Everything is admin-party by default.
Check the credentials further up the stack using basic auth or whatevs.

repos.listen(...)
-----------------

Create and return a new http server using `repos.handle`.

Any arguments will be passed to `server.listen()`.

repos.exists(repoName, cb)
--------------------------

Find out whether `repoName` exists in the callback `cb(exists)`.

license
=======

MIT/X11

kudos
=====

Reading through
[grack](https://github.com/schacon/grack/blob/master/lib/git_http.rb)
was super handy.
For the initial project, [substack](https://github.com/substack)
