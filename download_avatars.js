var request = require('request');
var fs = require('fs');
var repoName = process.argv[3]
var repoOwner = process.argv[2]
var GITHUB_USER = "FrancoisBF";
var GITHUB_TOKEN = "8e57623101196322f5232222f7cf31a6d115c1c2";

console.log("welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {


  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
   var requestOptions ={
    headers: {
      "user-agent":"lighthouselabs"
    },
    url: requestURL
  }
  request.get(requestOptions, cb);

}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
  console.log("URL: " + url + ", filepath: " + filePath);
}
getRepoContributors(repoOwner, repoName, function(err, body) {
  let parsedResults = JSON.parse(body);
  for (var i = 0; i < parsedResults.length; i++) {
    downloadImageByURL(parsedResults[i]["avatar_url"], `avatars/${i}.jpg`);
  }
  // console.log("Errors:", err
    // console.log("Result:", parsedResults);
  // console.log(parsedResults);
});

