var request = require('request');
var githubToken = require('./secrets')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    let options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request'
        },
        authorization: githubToken
    }
    request(options, function (err, res, body) {
        cb(err, body);
    })
}

getRepoContributors("jquery", "jquery", function (err, result) {
    console.log("Errors:", err);
    let parsed = JSON.parse(result)
    parsed.forEach(element => {
        console.log('element', element.avatar_url)
    });

});