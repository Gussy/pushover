var pushover = require('../');
var repos = pushover(__dirname + '/repos');

repos.on('push', function (repo) {
    console.log('received a push to ' + repo);
});

repos.on('clone', function (repo) {
    console.log('transmitted a clone of ' + repo);
});

repos.listen(7000);
