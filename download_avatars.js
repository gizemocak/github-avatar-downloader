var request = require('request');
var githubToken = require('./secrets')
var fs = require('fs')

let owner = process.argv[2]
let name = process.argv[3]

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

getRepoContributors(owner, name, function (err, result) {
    if (owner && name) {
        console.log("Errors:", err);
        let parsed = JSON.parse(result)
        parsed.forEach(element => {
            downloadImageByURL(element.avatar_url, `${element.login}.jpeg`)
        });
    } else {
        console.log('Error: Please enter a repo owner and a repo name!')
    }

});

function downloadImageByURL(url, filePath) {
    request.get(url)
        .on('error', function (err) {
            console.log('error', err)
        })
        .on('response', function (response) {
            console.log(JSON.stringify(response))
            console.log('Response Status Code: ', response.statusCode);
            console.log('Response Message: ', response.statusMessage);
        })
        .pipe(fs.createWriteStream(filePath))
}